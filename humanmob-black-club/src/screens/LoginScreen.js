import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Input from '../components/Input';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      // la navegación se maneja automáticamente en AppNavigator
    } catch (e) {
      setError(e.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#F3F4F6' }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' }}>
        Iniciar Sesión
      </Text>

      <Input
        label="Correo electrónico"
        placeholder="usuario@ejemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        label="Contraseña"
        placeholder="********"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? (
        <Text style={{ color: 'red', marginBottom: 16, textAlign: 'center' }}>{error}</Text>
      ) : null}

      <TouchableOpacity
        style={{
          backgroundColor: '#1F2937',
          paddingVertical: 14,
          borderRadius: 6,
          alignItems: 'center',
          marginBottom: 16,
        }}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 16 }}>Entrar</Text>
        )}
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={{ color: '#4B5563' }}>¿No tienes cuenta? </Text>
        <TouchableOpacity onPress={() => {/* navegar a pantalla de registro */}}>
          <Text style={{ color: '#1F2937', fontWeight: '600' }}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}