import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AuxilioInvalidezScreen() {
  const [exerceAtividade, setExerceAtividade] = useState<boolean>(false);
  const [cienteTermos, setCienteTermos] = useState<boolean>(false);
  const [loadingCep, setLoadingCep] = useState<boolean>(false);
  const [loadingDadosBanco, setLoadingDadosBanco] = useState<boolean>(true);
  const [editandoEndereco, setEditandoEndereco] = useState<boolean>(false);

  const [form, setForm] = useState({
    cep: '',
    endereco: '',
    bairro: '',
    cidade: '',
    uf: '',
    telefone: '',
    email: '',
  });

  // Simula o carregamento dos dados já existentes no banco do SVPM
  useEffect(() => {
    const carregarDadosDoBanco = async () => {
      try {
        setTimeout(() => {
          setForm({
            cep: '21041-190',
            endereco: 'Rua Engenheiro Artur Moura, 456, BL6 AP405',
            bairro: 'Bonsucesso',
            cidade: 'Rio de Janeiro',
            uf: 'RJ',
            telefone: '(21) 98032-4930',
            email: 'usuario@marinha.mil.br',
          });
          setLoadingDadosBanco(false);
        }, 800);
      } catch (error) {
        setLoadingDadosBanco(false);
      }
    };

    carregarDadosDoBanco();
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Máscara e formatador de Telefone
  const handlePhoneChange = (value: string) => {
    const raw = value.replace(/\D/g, '');
    let formatted = raw;

    if (raw.length > 10) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
    } else if (raw.length > 6) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6, 10)}`;
    } else if (raw.length > 2) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    } else if (raw.length > 0) {
      formatted = `(${raw}`;
    }

    handleChange('telefone', formatted);
  };

  // Buscar endereço via CEP automaticamente ao editar
  const handleCepChange = async (value: string) => {
    const rawCep = value.replace(/\D/g, '');
    let formattedCep = rawCep;
    if (rawCep.length > 5) {
      formattedCep = `${rawCep.slice(0, 5)}-${rawCep.slice(5, 8)}`;
    }
    handleChange('cep', formattedCep);

    if (rawCep.length === 8) {
      setLoadingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setForm((prev) => ({
            ...prev,
            endereco: data.logradouro || prev.endereco,
            bairro: data.bairro || prev.bairro,
            cidade: data.localidade || prev.cidade,
            uf: data.uf || prev.uf,
          }));
        }
      } catch (e) {
        // Ignora erro de rede silenciosamente
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleEnviar = () => {
    if (!form.cep || !form.endereco || !form.cidade || !form.telefone) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha os dados de endereço e telefone.');
      return;
    }

    if (!cienteTermos) {
      Alert.alert('Atenção', 'Você deve confirmar estar ciente dos termos da declaração antes de enviar.');
      return;
    }

    if (exerceAtividade) {
      Alert.alert(
        'Declaração Registrada',
        'Sua declaração indicando o exercício de atividade remunerada foi enviada. O SVPM analisará as informações prestadas.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } else {
      Alert.alert(
        'Declaração Enviada',
        'Sua Declaração Anual de Auxílio-Invalidez foi transmitida com sucesso.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoIcon}>⚓</Text>
          </View>
          <Text style={styles.headerTitle}>Família Naval</Text>
          <Text style={styles.headerSubtitle}>Declaração Auxílio-Invalidez</Text>
        </View>

        {/* CARD PRINCIPAL */}
        <View style={styles.card}>
          <Text style={styles.docTitle}>
            DECLARAÇÃO ANUAL PARA PERCEPÇÃO DO AUXÍLIO-INVALIDEZ
          </Text>

          {/* TEXTO DESCRITIVO CONFORME A IMAGEM */}
          <Text style={styles.declarationText}>
            Eu, <Text style={styles.boldText}>SO GUILHERME SOUSA DA SILVA</Text>, portador(a) do NIP{' '}
            <Text style={styles.boldText}>85856967</Text>, CPF{' '}
            <Text style={styles.boldText}>00000028797</Text>, recebendo a Parcela de Auxílio-Invalidez por
            intermédio do SERVIÇO DE VETERANOS E PENSIONISTAS DA MARINHA, declaro, para fins do artigo 78 do
            DECRETO nº. 4.307 de 18 de julho de 2002, que:
          </Text>

          {/* PERGUNTA CHAVE (SEGMENTED BUTTONS) */}
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>
              Exerce atividade remunerada pública ou privada?
            </Text>
            <View style={styles.segmentedContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.segmentBtn, !exerceAtividade && styles.segmentActiveNo]}
                onPress={() => setExerceAtividade(false)}>
                <Text style={[styles.segmentText, !exerceAtividade && styles.segmentTextActive]}>
                  NÃO EXERÇO
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.segmentBtn, exerceAtividade && styles.segmentActiveYes]}
                onPress={() => setExerceAtividade(true)}>
                <Text style={[styles.segmentText, exerceAtividade && styles.segmentTextActive]}>
                  EXERÇO
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* AVISOS LEGAIS COM CHECKBOX OBRIGATÓRIA */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.infoBox, cienteTermos && styles.infoBoxChecked]}
            onPress={() => setCienteTermos(!cienteTermos)}>
            <View style={styles.checkboxRow}>
              <View style={[styles.checkbox, cienteTermos && styles.checkboxChecked]}>
                {cienteTermos && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>Declaro que estou ciente (Obrigatório):</Text>
            </View>
            <Text style={styles.infoText}>
              • Estou ciente de que, anualmente, deverei fazer chegar ao SVPM nova Declaração, para ratificar ou não esta situação.
            </Text>
            <Text style={[styles.infoText, { marginTop: 4 }]}>
              • Estou ciente de que o não atendimento desta exigência implicará na retirada da parcela da minha remuneração mensal.
            </Text>
          </TouchableOpacity>

          {/* CABEÇALHO DA SEÇÃO DE ENDEREÇO */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeader}>Preencha os dados de contato e endereço:</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnEditar}
              onPress={() => setEditandoEndereco(!editandoEndereco)}>
              <Text style={styles.btnEditarTexto}>
                {editandoEndereco ? '🔒 Bloquear' : '✏️ Editar'}
              </Text>
            </TouchableOpacity>
          </View>

          {loadingDadosBanco ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#003366" />
              <Text style={styles.loadingText}>Buscando endereço cadastrado...</Text>
            </View>
          ) : (
            <>
              {/* CEP */}
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>CEP</Text>
                  {loadingCep && <ActivityIndicator size="small" color="#003366" />}
                </View>
                <TextInput
                  style={[styles.input, !editandoEndereco && styles.inputDisabled]}
                  placeholder="00000-000"
                  keyboardType="numeric"
                  maxLength={9}
                  editable={editandoEndereco}
                  value={form.cep}
                  onChangeText={handleCepChange}
                />
              </View>

              {/* ENDEREÇO */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Endereço (Rua, Nº, Apto, etc.)</Text>
                <TextInput
                  style={[styles.input, !editandoEndereco && styles.inputDisabled]}
                  placeholder="Rua, Número, Complemento"
                  editable={editandoEndereco}
                  value={form.endereco}
                  onChangeText={(t) => handleChange('endereco', t)}
                />
              </View>

              {/* BAIRRO */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Bairro</Text>
                <TextInput
                  style={[styles.input, !editandoEndereco && styles.inputDisabled]}
                  placeholder="Bairro"
                  editable={editandoEndereco}
                  value={form.bairro}
                  onChangeText={(t) => handleChange('bairro', t)}
                />
              </View>

              {/* CIDADE */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cidade</Text>
                <TextInput
                  style={[styles.input, !editandoEndereco && styles.inputDisabled]}
                  placeholder="Cidade"
                  editable={editandoEndereco}
                  value={form.cidade}
                  onChangeText={(t) => handleChange('cidade', t)}
                />
              </View>

              {/* UF */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>UF</Text>
                <TextInput
                  style={[styles.input, !editandoEndereco && styles.inputDisabled]}
                  placeholder="RJ"
                  maxLength={2}
                  autoCapitalize="characters"
                  editable={editandoEndereco}
                  value={form.uf}
                  onChangeText={(t) => handleChange('uf', t)}
                />
              </View>

              {/* TELEFONE */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                  style={[styles.input, !editandoEndereco && styles.inputDisabled]}
                  placeholder="(00) 00000-0000"
                  keyboardType="phone-pad"
                  maxLength={15}
                  editable={editandoEndereco}
                  value={form.telefone}
                  onChangeText={handlePhoneChange}
                />
              </View>

              {/* EMAIL */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  style={[styles.input, !editandoEndereco && styles.inputDisabled]}
                  placeholder="seu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={editandoEndereco}
                  value={form.email}
                  onChangeText={(t) => handleChange('email', t)}
                />
              </View>
            </>
          )}

          {/* AÇÕES */}
          <TouchableOpacity activeOpacity={0.8} style={styles.btnPrimary} onPress={handleEnviar}>
            <Text style={styles.btnPrimaryText}>Enviar Declaração</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={styles.btnSecondary} onPress={() => router.back()}>
            <Text style={styles.btnSecondaryText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
  },
  content: {
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  logoBadge: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    marginBottom: 8,
    width: 50,
  },
  logoIcon: {
    fontSize: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#E0E6ED',
    fontSize: 13,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '100%',
  },
  docTitle: {
    color: '#003366',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  declarationText: {
    color: '#2D3748',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'justify',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1A202C',
  },
  questionBox: {
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    borderColor: '#D0DCE5',
    borderWidth: 1,
  },
  questionText: {
    color: '#003366',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#DDE5ED',
    borderRadius: 8,
    padding: 3,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  segmentActiveNo: {
    backgroundColor: '#003366',
  },
  segmentActiveYes: {
    backgroundColor: '#D32F2F',
  },
  segmentText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4A5568',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  infoBox: {
    backgroundColor: '#FFF8E1',
    borderColor: '#FFE082',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  infoBoxChecked: {
    backgroundColor: '#FEF9E7',
    borderColor: '#F6C343',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#795548',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#003366',
    borderColor: '#003366',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    color: '#5D4037',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#5D4037',
    fontSize: 12,
    lineHeight: 18,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionHeader: {
    color: '#003366',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  btnEditar: {
    backgroundColor: '#EBF3FA',
    borderColor: '#003366',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  btnEditarTexto: {
    color: '#003366',
    fontSize: 12,
    fontWeight: 'bold',
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
    fontSize: 13,
  },
  inputGroup: {
    marginBottom: 12,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    color: '#333333',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
    height: 44,
    paddingHorizontal: 12,
    color: '#333333',
  },
  inputDisabled: {
    backgroundColor: '#F0F4F8',
    color: '#666666',
    borderColor: '#D0DCE5',
  },
  btnPrimary: {
    backgroundColor: '#003366',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  btnSecondary: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  btnSecondaryText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
});