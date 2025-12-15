import requests
import time
import json

# --- Configurações Visuais para o Terminal ---
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

# Lista para armazenar os tempos de execução
latencias = []

def executar_requisicao(metodo, url, payload=None, descricao=""):
    """
    Função genérica para executar requisições, medir tempo e printar resultados.
    """
    print(f"{Colors.HEADER}--- {descricao} ---{Colors.ENDC}")
    print(f"{Colors.BOLD}URL:{Colors.ENDC} {url}")
    
    start_time = time.time()
    
    try:
        if metodo == 'POST':
            response = requests.post(url, json=payload)
        elif metodo == 'GET':
            response = requests.get(url)
        else:
            print("Método não suportado neste script.")
            return None

        end_time = time.time()
        tempo_total = end_time - start_time
        latencias.append(tempo_total)
        
        # Tenta formatar o JSON de resposta para ficar legível
        try:
            resp_json = response.json()
            pretty_json = json.dumps(resp_json, indent=4, ensure_ascii=False)
        except:
            resp_json = response.text
            pretty_json = response.text

        # Prints de Métricas e Resultado
        status_color = Colors.OKGREEN if 200 <= response.status_code < 300 else Colors.FAIL
        print(f"{Colors.BOLD}Status Code:{Colors.ENDC} {status_color}{response.status_code}{Colors.ENDC}")
        print(f"{Colors.BOLD}Tempo de Resposta:{Colors.ENDC} {tempo_total:.4f} segundos")
        print(f"{Colors.BOLD}Response Body:{Colors.ENDC}\n{pretty_json}")
        print("\n")
        
        return resp_json

    except requests.exceptions.ConnectionError:
        print(f"{Colors.FAIL}ERRO: Não foi possível conectar ao servidor em {url}{Colors.ENDC}\n")
        return None

# ==========================================
# 1. REQUISIÇÃO: Criar Pedido (Order)
# ==========================================
payload_order = {
    "clientId": 1,
    "total": 100,
    "paymentMethodId": 1,
    "payment": {
        "payments": [
            {
                "total": 100,
                "paymentMethodId": 1
            }
        ]
    },
    "products": [
        {
            "id": 3,
            "name": "Mouse Gamer",
            "quantity": 1,
            "price": 100
        }
    ]
}

executar_requisicao(
    'POST', 
    'http://localhost:8001/api/orders', 
    payload_order, 
    "REQ 1: Criar Pedido"
)

# ==========================================
# 2. REQUISIÇÃO: Listar Pagamentos
# ==========================================
response_list = executar_requisicao(
    'GET', 
    'http://localhost:8002/api/payments/list', 
    None, 
    "REQ 2: Listar Pagamentos e Capturar ID"
)

# Lógica para pegar o último ID
payment_order_id = None

if response_list and isinstance(response_list, list) and len(response_list) > 0:
    # Pega o último objeto da lista e extrai o ID (assumindo que a chave seja 'id' ou 'paymentOrderId')
    # Ajuste a chave abaixo 'id' caso o seu JSON retorne outro nome (ex: 'orderId')
    ultimo_registro = response_list[0]
    
    # Tenta encontrar o ID (ajuste conforme seu retorno real)
    if 'id' in ultimo_registro:
        payment_order_id = ultimo_registro['id']
    elif 'paymentOrderId' in ultimo_registro:
        payment_order_id = ultimo_registro['paymentOrderId']
    
    print(f"{Colors.OKBLUE}>> ID Capturado para próxima requisição: {payment_order_id}{Colors.ENDC}\n")
else:
    print(f"{Colors.FAIL}>> ERRO: Não foi possível capturar o ID da lista (Lista vazia ou formato inválido).{Colors.ENDC}\n")

# ==========================================
# 3. REQUISIÇÃO: Processar Pagamento
# ==========================================
if payment_order_id:
    payload_process = {
        "paymentOrderId": payment_order_id, # ID injetado dinamicamente
        "statusId": 1
    }

    executar_requisicao(
        'POST', 
        'http://localhost:8002/api/payments/process', 
        payload_process, 
        "REQ 3: Processar Pagamento"
    )
else:
    print(f"{Colors.WARNING}Pulando Requisição 3 pois não temos o ID necessário.{Colors.ENDC}")

# ==========================================
# RELATÓRIO FINAL
# ==========================================
print(f"{Colors.HEADER}=== RELATÓRIO FINAL ==={Colors.ENDC}")
if latencias:
    media = sum(latencias) / len(latencias)
    print(f"Total de requisições: {len(latencias)}")
    print(f"Tempo total decorrido: {sum(latencias):.4f}s")
    print(f"{Colors.OKBLUE}Média de tempo por requisição: {media:.4f}s{Colors.ENDC}")
else:
    print("Nenhuma requisição foi completada com sucesso.")