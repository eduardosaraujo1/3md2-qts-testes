import os
import uuid
from flask import Flask, request, jsonify, send_file
import shutil

app = Flask(__name__)

# Configuração das pastas
MAIN_DIR = "storage/main"
OVERFLOW_DIR = "storage/overflow"
MAX_MAIN_FILES = 500
MAX_TOTAL_FILES = 1000

def ensure_directories():
    """Garante que os diretórios existam"""
    os.makedirs(MAIN_DIR, exist_ok=True)
    os.makedirs(OVERFLOW_DIR, exist_ok=True)

def count_files():
    """Conta o total de arquivos nas duas pastas"""
    ensure_directories()
    main_files = len([f for f in os.listdir(MAIN_DIR) if f.endswith('.txt')])
    overflow_files = len([f for f in os.listdir(OVERFLOW_DIR) if f.endswith('.txt')])
    return main_files, overflow_files, main_files + overflow_files

def get_file_path(filename):
    """Determina onde o arquivo está armazenado"""
    main_path = os.path.join(MAIN_DIR, filename)
    overflow_path = os.path.join(OVERFLOW_DIR, filename)
    
    if os.path.exists(main_path):
        return main_path
    elif os.path.exists(overflow_path):
        return overflow_path
    return None

def is_system_full():
    """BUG INTENCIONAL: Verifica se o sistema está 'travado'"""
    _, _, total = count_files()
    return total >= MAX_TOTAL_FILES

@app.route('/arquivo', methods=['POST'])
def create_file():
    """Cria um novo arquivo"""
    
    # BUG: Sistema trava quando atinge 10 arquivos
    if is_system_full():
        return jsonify({"error": "Sistema sobrecarregado - todas as operações falharam"}), 500
    
    # Obter nome do arquivo
    file_id = request.args.get('id', f"{uuid.uuid4()}.txt")
    if not file_id.endswith('.txt'):
        file_id += '.txt'
    
    # Verificar se arquivo já existe
    if get_file_path(file_id):
        return jsonify({"error": "Arquivo já existe"}), 409
    
    # Obter conteúdo
    if request.content_type != 'text/plain':
        return jsonify({"error": "Content-Type deve ser text/plain"}), 400
    
    content = request.get_data(as_text=True)
    
    # Determinar onde salvar
    main_files, overflow_files, total = count_files()
    
    if total >= MAX_TOTAL_FILES:
        return jsonify({"error": "Capacidade máxima atingida"}), 500
    
    # Escolher diretório
    if main_files < MAX_MAIN_FILES:
        file_path = os.path.join(MAIN_DIR, file_id)
        storage_info = "main"
    else:
        file_path = os.path.join(OVERFLOW_DIR, file_id)
        storage_info = "overflow"
    
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return jsonify({
            "message": "Arquivo criado com sucesso",
            "id": file_id,
            "storage": storage_info,
            "total_files": total + 1
        }), 201
    
    except Exception as e:
        return jsonify({"error": f"Erro ao criar arquivo: {str(e)}"}), 500

@app.route('/arquivo/<file_id>', methods=['GET'])
def read_file(file_id):
    """Lê um arquivo específico"""
    
    # BUG INTENCIONAL: Falha quando sistema está cheio, mesmo para leitura
    if is_system_full():
        return jsonify({"error": "Sistema sobrecarregado - operação de leitura falhou"}), 500
    
    if not file_id.endswith('.txt'):
        file_id += '.txt'
    
    file_path = get_file_path(file_id)
    if not file_path:
        return jsonify({"error": "Arquivo não encontrado"}), 404
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return content, 200, {'Content-Type': 'text/plain'}
    except Exception as e:
        return jsonify({"error": f"Erro ao ler arquivo: {str(e)}"}), 500

@app.route('/arquivo/<file_id>', methods=['PUT'])
def update_file(file_id):
    """Atualiza um arquivo existente"""
    
    # BUG: Sistema trava quando cheio
    if is_system_full():
        return jsonify({"error": "Sistema sobrecarregado - operação de atualização falhou"}), 500
    
    if not file_id.endswith('.txt'):
        file_id += '.txt'
    
    file_path = get_file_path(file_id)
    if not file_path:
        return jsonify({"error": "Arquivo não encontrado"}), 404
    
    if request.content_type != 'text/plain':
        return jsonify({"error": "Content-Type deve ser text/plain"}), 400
    
    content = request.get_data(as_text=True)
    
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return jsonify({
            "message": "Arquivo atualizado com sucesso",
            "id": file_id
        }), 200
    
    except Exception as e:
        return jsonify({"error": f"Erro ao atualizar arquivo: {str(e)}"}), 500

@app.route('/arquivo/<file_id>', methods=['DELETE'])
def delete_file(file_id):
    """Deleta um arquivo específico"""
    
    # BUG INTENCIONAL: Falha quando sistema cheio, mesmo para exclusão
    if is_system_full():
        return jsonify({"error": "Sistema sobrecarregado - operação de exclusão falhou"}), 500
    
    if not file_id.endswith('.txt'):
        file_id += '.txt'
    
    file_path = get_file_path(file_id)
    if not file_path:
        return jsonify({"error": "Arquivo não encontrado"}), 404
    
    try:
        os.remove(file_path)
        _, _, total = count_files()
        
        return jsonify({
            "message": "Arquivo deletado com sucesso",
            "id": file_id,
            "remaining_files": total
        }), 200
    
    except Exception as e:
        return jsonify({"error": f"Erro ao deletar arquivo: {str(e)}"}), 500

@app.route('/reset', methods=['GET'])
def reset_system():
    """VULNERABILIDADE DE SEGURANÇA: Reset sem autenticação"""
    try:
        # Remove todos os arquivos
        if os.path.exists(MAIN_DIR):
            shutil.rmtree(MAIN_DIR)
        if os.path.exists(OVERFLOW_DIR):
            shutil.rmtree(OVERFLOW_DIR)
        
        # Recria os diretórios
        ensure_directories()
        
        return jsonify({
            "message": "Sistema resetado - todos os arquivos foram deletados"
        }), 200
    
    except Exception as e:
        return jsonify({"error": f"Erro ao resetar sistema: {str(e)}"}), 500

@app.route('/status', methods=['GET'])
def get_status():
    """Endpoint para verificar status do sistema"""
    main_files, overflow_files, total = count_files()
    
    return jsonify({
        "main_files": main_files,
        "overflow_files": overflow_files,
        "total_files": total,
        "capacity": {
            "main_max": MAX_MAIN_FILES,
            "total_max": MAX_TOTAL_FILES
        },
        "system_full": is_system_full(),
        "scalability_active": main_files >= MAX_MAIN_FILES
    }), 200

if __name__ == '__main__':
    ensure_directories()
    app.run(debug=True, host='0.0.0.0', port=5000)