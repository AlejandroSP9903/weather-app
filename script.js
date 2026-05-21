const botonBuscar = document.querySelector('#buscar')
const inputCiudad = document.querySelector('#ciudad')
const divClima = document.querySelector('#clima')

const ciudades = {
  'bogotá': { lat: 4.7110, lon: -74.0721, pais: 'Colombia' },
  'medellin': { lat: 6.2442, lon: -75.5729, pais: 'Colombia' },
  'cali': { lat: 3.4516, lon: -76.5319, pais: 'Colombia' },
  'cartagena': { lat: 10.3932, lon: -75.4830, pais: 'Colombia' },
  'buenos aires': { lat: -34.6037, lon: -58.3816, pais: 'Argentina' }
}

async function obtenerClima(ciudad) {
  ciudad = ciudad.toLowerCase().trim()
  
  if (!ciudades[ciudad]) {
    divClima.innerHTML = '<p class="error">❌ Ciudad no encontrada. Intenta con otra. También puedes revisar si el nombre esta bien escrito. Recuerda poner los signos de puntuación.</p>'
    return
  }
  
  const { lat, lon, pais } = ciudades[ciudad]
  
  divClima.innerHTML = '<p>⏳ Buscando clima...</p>'
  
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
    )
    const datos = await response.json()
    
    const temp = datos.current.temperature_2m
    divClima.innerHTML = `
      <h2>${ciudad.toUpperCase()}, ${pais}</h2>
      <p>🌡️ Temperatura: <strong>${temp}°C</strong></p>
      <p>☁️ Código de clima: ${datos.current.weather_code}</p>
    `
  } catch (error) {
    divClima.innerHTML = '<p class="error">❌ Error al obtener datos. Intenta de nuevo.</p>'
  }
}

botonBuscar.addEventListener('click', function() {
  const ciudad = inputCiudad.value
  if (ciudad.trim()) {
    obtenerClima(ciudad)
  } else {
    divClima.innerHTML = '<p class="error">❌ Escribe una ciudad primero.</p>'
  }
})

// Bonus: Buscar al presionar Enter
inputCiudad.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    botonBuscar.click()
  }
})