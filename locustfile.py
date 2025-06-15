from locust import HttpUser, task

class HelloWorldUser(HttpUser):
    @task
    def hello_world(self):
        headers = {'Content-Type': 'text/plain'}
        self.client.post('/arquivo', data="Teste de Stress", headers=headers)