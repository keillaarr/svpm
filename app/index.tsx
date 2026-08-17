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
            <Text style={styles.logoTexto}>⚓</Text>
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
            •  Declaração Auxílio-Invalidez
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/cadastro-ttc')}>
            <Text style={styles.botaoTexto}>
            •  Cadastro TTC 
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/consulta')}>
            <Text style={styles.botaoTexto}>
            •  Consultas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/alteracao-email')}>
            <Text style={styles.botaoTexto}>
            •  Alteração de Email
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.push('/links-uteis')}>
            <Text style={styles.botaoTexto}>• Links Úteis</Text>
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
    padding: 40,
  },
  logoPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    marginBottom: 10,
    width: 60,
  },
  logoTexto: {
    fontSize: 30,
  },
  titulo: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#D1D1D1',
    fontSize: 14,
    fontStyle: 'italic',
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
