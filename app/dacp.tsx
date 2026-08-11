import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function DacpScreen() {
  const [exerceAtividade, setExerceAtividade] = useState(false);

  const [form, setForm] = useState({
    cep: '',
    endereco: '',
    bairro: '',
    cidade: '',
    uf: '',
    telefone: '',
    email: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEnviar = () => {
    Alert.alert(
      'Declaração enviada',
      'Sua declaração foi registrada com sucesso.',
    );

    console.log(form);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* HEADER PADRÃO */}
        <View style={styles.header}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoTexto}>⚓</Text>
          </View>

          <Text style={styles.titulo}>Família Naval</Text>

          <Text style={styles.subtitulo}>
            Declaração Auxílio-Invalidez
          </Text>
        </View>

        {/* CONTEÚDO */}
        <View style={styles.corpo}>
          <Text style={styles.secaoTitulo}>
            Declaração Anual
          </Text>

          <View style={styles.card}>
            <Text style={styles.cardTitulo}>
              DECLARAÇÃO ANUAL PARA PERCEPÇÃO
              DO AUXÍLIO-INVALIDEZ
            </Text>

            <Text style={styles.texto}>
              Declaro, para fins do artigo 78 do Decreto nº
              4.307 de 18 de julho de 2002:
            </Text>

            {/* SWITCH */}
            <View style={styles.switchContainer}>
              <Text style={styles.label}>
                Exerce atividade remunerada pública ou privada?
              </Text>

              <View style={styles.switchRow}>
                <Text style={styles.switchTexto}>
                  {exerceAtividade
                    ? 'EXERÇO'
                    : 'NÃO EXERÇO'}
                </Text>

                <Switch
                  value={exerceAtividade}
                  onValueChange={setExerceAtividade}
                />
              </View>
            </View>

            <Text style={styles.aviso}>
              Estou ciente de que, anualmente,
              deverei encaminhar nova declaração ao SVPM.
            </Text>

            <Text style={styles.aviso}>
              O não atendimento desta exigência poderá
              implicar na retirada da parcela da remuneração.
            </Text>

            <View style={styles.divider} />

            <Text style={styles.subtituloSessao}>
              Dados de contato e endereço
            </Text>

            {/* CEP */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>CEP</Text>

              <TextInput
                style={styles.input}
                placeholder="00000-000"
                value={form.cep}
                onChangeText={(text) =>
                  handleChange('cep', text)
                }
              />
            </View>

            {/* ENDEREÇO */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Endereço
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Rua, número, apartamento..."
                value={form.endereco}
                onChangeText={(text) =>
                  handleChange('endereco', text)
                }
              />
            </View>

            {/* BAIRRO */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bairro</Text>

              <TextInput
                style={styles.input}
                placeholder="Digite o bairro"
                value={form.bairro}
                onChangeText={(text) =>
                  handleChange('bairro', text)
                }
              />
            </View>

            {/* CIDADE */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cidade</Text>

              <TextInput
                style={styles.input}
                placeholder="Digite a cidade"
                value={form.cidade}
                onChangeText={(text) =>
                  handleChange('cidade', text)
                }
              />
            </View>

            {/* UF */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>UF</Text>

              <TextInput
                style={styles.input}
                placeholder="RJ"
                maxLength={2}
                autoCapitalize="characters"
                value={form.uf}
                onChangeText={(text) =>
                  handleChange('uf', text)
                }
              />
            </View>

            {/* TELEFONE */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Telefone</Text>

              <TextInput
                style={styles.input}
                placeholder="(00) 00000-0000"
                keyboardType="phone-pad"
                value={form.telefone}
                onChangeText={(text) =>
                  handleChange('telefone', text)
                }
              />
            </View>

            {/* EMAIL */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>

              <TextInput
                style={styles.input}
                placeholder="email@exemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={form.email}
                onChangeText={(text) =>
                  handleChange('email', text)
                }
              />
            </View>

            {/* BOTÃO ENVIAR */}
            <TouchableOpacity
              style={styles.botaoEnviar}
              onPress={handleEnviar}>
              <Text style={styles.botaoEnviarTexto}>
                Enviar Declaração
              </Text>
            </TouchableOpacity>

            {/* BOTÃO VOLTAR */}
            <TouchableOpacity
              style={styles.botaoVoltar}
              onPress={() => router.back()}>
              <Text style={styles.botaoVoltarTexto}>
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },

  header: {
    alignItems: 'center',
    backgroundColor: '#003B75',
    paddingBottom: 40,
    paddingTop: 50,
  },

  logoPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    height: 80,
    justifyContent: 'center',
    marginBottom: 15,
    width: 80,
  },

  logoTexto: {
    fontSize: 40,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  subtitulo: {
    color: '#D6E4F0',
    fontSize: 16,
    fontStyle: 'italic',
  },

  corpo: {
    padding: 20,
  },

  secaoTitulo: {
    color: '#003366',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    padding: 20,
  },

  cardTitulo: {
    color: '#003366',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 28,
    marginBottom: 20,
    textAlign: 'center',
  },

  texto: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
  },

  switchContainer: {
    marginBottom: 20,
  },

  switchRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  switchTexto: {
    color: '#003366',
    fontSize: 15,
    fontWeight: 'bold',
  },

  aviso: {
    color: '#555555',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
  },

  divider: {
    backgroundColor: '#E2E8F0',
    height: 1,
    marginVertical: 20,
  },

  subtituloSessao: {
    color: '#003366',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    color: '#333333',
    fontSize: 14,
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DADCE0',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 15,
    height: 52,
    paddingHorizontal: 14,
  },

  botaoEnviar: {
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    marginTop: 15,
    paddingVertical: 16,
  },

  botaoEnviarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botaoVoltar: {
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    marginTop: 12,
    paddingVertical: 14,
  },

  botaoVoltarTexto: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
});