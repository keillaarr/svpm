import { Image } from 'expo-image';
import { openBrowserAsync } from 'expo-web-browser';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LINKS = [
  { label: 'BP Online', url: 'https://bponline.marinha.mil.br/bponline/login' },
  { label: 'eConsig', url: 'https://papem.econsigmb.com.br/mb/v3/autenticar#no-back' },
  { label: 'Pesquisa de Avaliação do Atendimento', url: 'https://www.marinha.mil.br/svpm/form/pesquisaAtendimento' },
  { label: 'Abrigo do Marinheiro', url: 'https://www.abrigo.org.br/' },
  { label: 'Identidade Digital', url: 'https://www.marinha.mil.br/sim/id_digital' },
];

export default function LinksUteis() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoTexto}>⚓</Text>
          </View>
          <Text style={styles.headerTitle}>Família Naval</Text>
          <Text style={styles.headerSubtitle}>Links Úteis</Text>
        </View>

        <View style={styles.content}>

          <View style={styles.body}>
            {LINKS.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.linkButton}
                onPress={async () => {
                  try {
                    await openBrowserAsync(item.url);
                  } catch (e) {
                    console.warn('Failed to open url', item.url, e);
                  }
                }}>
                <Image source={require('@/assets/images/react-logo.png')} style={styles.linkIcon} contentFit="contain" />
                <Text style={styles.linkText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#003366',
    padding: 40,
  },
  logoPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    marginBottom: 10,
    width: 60,
  },
  logoTexto: {
    fontSize: 30,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#D1D1D1',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#003366',
    borderRadius: 12,
    padding: 24,
    elevation: 2,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 20,
    elevation: 2,
  },
  linkButton: {
    alignItems: 'center',
    marginBottom: 18,
  },
  linkIcon: {
    width: 96,
    height: 96,
    borderRadius: 12,
    marginBottom: 8,
  },
  linkText: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
  },
  
});
