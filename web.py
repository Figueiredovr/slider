import webbrowser
import socket

url = 'https://docs.google.com/presentation/d/1gTHFqZ0MDVrElWNvRoca4UdqzJEPHaznpmYqrfDL1Qc/present#slide='
count = 1
HOST = ''              # Endereco IP do Servidor
PORT = 5000            # Porta que o Servidor esta
tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
orig = (HOST, PORT)
tcp.bind(orig)
tcp.listen(1)
while True:
    con, cliente = tcp.accept()
    print 'Concetado por', cliente
    while True:
        msg = con.recv(1024)
        if not msg: break
	    url2 = url + "%d"%(count)
	    count = count + 1
	    webbrowser.open(url2, new =0, autoraise=False)
    print 'Finalizando conexao do cliente', cliente
    con.close()

