
import addressAPI from './integration_config'
interface address {
    cep: string,
    logradouro: string,
    complemento: string,
    unidade: string,
    bairro: string,
    localidade: string,
    uf: string,
    estado: string,
    regiao: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string
  }

  export default async function getAddress(cep: string): Promise<address|null> {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const response = await addressAPI.get(url)

    
    const data = response.data

    if(response.status.toString() == "200" && data != null){
        return {
            cep: data.cep,
            logradouro: data.logradouro,
            complemento: data.complemento,
            unidade: data.unidade,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf,
            estado: data.estado,
            regiao: data.regiao,
            ibge: data.ibge,
            gia: data.gia,
            ddd: data.ddd,
            siafi: data.siafi
        }
    }

    return null;
    
  }