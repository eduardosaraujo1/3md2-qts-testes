import curses

produtos = ["Camiseta", "Tênis", "Calça", "Boné", "Meias", "Sair"]

def loop(stdscr):
    index = 0
    while True:
        stdscr.clear()
        stdscr.addstr("Selecione um produto para comprar:\n", curses.A_BOLD)
        for i, p in enumerate(produtos):
            if i == index:
                stdscr.addstr(f"> {p}\n", curses.A_REVERSE)
            else:
                stdscr.addstr(f"  {p}\n")

        key = stdscr.getch()

        if key in [curses.KEY_UP, ord('k')]:
            index = (index - 1) % len(produtos)
        elif key in [curses.KEY_DOWN, ord('j')]:
            index = (index + 1) % len(produtos)
        elif key in [curses.KEY_ENTER, ord('\n')]:
            if produtos[index] == "Sair":
                return -1

            stdscr.clear()
            stdscr.addstr(f"Compra de '{produtos[index]}' concluída com êxito!\n")
            stdscr.getch()
            return produtos[index]

def main():
    return curses.wrapper(loop)

if __name__ == "__main__":
    main()
