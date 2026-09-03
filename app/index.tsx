import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const declaracaoDependentesUrl =
  'https://portalcidadao.dataprev.gov.br/#/mb/r/novo-pedido/informacao/2709/declaracao-de-dependentes-para-fins-de-imposto-de-renda-retido-na-fonte';

const openExternalLink = (url: string) => {
  Linking.openURL(url);
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.logoPlaceholder}>
            <Image 
                source={require('@/assets/images/logo-marinha.jpg')} 
                style={styles.logoImagem} 
                contentFit="cover" 
              />
          </View>
          <Text style={styles.titulo}>Família Naval</Text>
          <Text style={styles.subtitulo}>O Sr. está no SVPM!</Text>
        </View>

        <View style={styles.corpo}>
          <Text style={styles.secaoTitulo}>Serviços mais usados do SVPM</Text>

          <TouchableOpacity style={styles.botao} onPress={() => openExternalLink(declaracaoDependentesUrl)}>
            <Text style={styles.botaoTexto}>• Declaração de Dependentes para IRRF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/dacp')}>
            <Text style={styles.botaoTexto}>
              • Declaração Auxílio-Invalidez
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/cadastro-ttc')}>
            <Text style={styles.botaoTexto}>
              • Cadastro TTC 
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/consulta')}>
            <Text style={styles.botaoTexto}>
              • Consultas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/alteracao-email')}>
            <Text style={styles.botaoTexto}>
              • Alteração de Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/links-uteis')}>
            <Text style={styles.botaoTexto}>• Links Úteis</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/dados-cadastrais' as any)}>
            <Text style={styles.botaoTexto}>• Dados Cadastrais</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/consulta-agendamento' as any)}>
            <Text style={styles.botaoTexto}>• Consulta Agendamento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/inserir-comunicados' as any)}>
            <Text style={styles.botaoTexto}>• Inserir Comunicados</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#003366',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  logoPlaceholder: {
  alignItems: 'center',
  backgroundColor: '#FFF',
  borderRadius: 50,
  height: 150,
  width: 150,
  justifyContent: 'center',
  marginBottom: 35,
  overflow: 'hidden', // Mantém o corte redondo perfeito nas bordas
},
  logoImagem: {
    width: '100%',
    height: '100%',
  },
  titulo: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  subtitulo: {
    color: '#E0E0E0',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
  },
  corpo: {
    padding: 20,
  },
  secaoTitulo: {
    color: '#003366',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  botao: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderRadius: 8,
    borderWidth: 1,
    elevation: 2,
    marginBottom: 10,
    padding: 15,
  },
  botaoTexto: {
    color: '#333',
    fontSize: 15,
  },
});