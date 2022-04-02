# indecision-app

### Pruebas unitarias y de integración
# ¿Qué son?
Las pruebas unitarias están enfocadas en pequeñas funcionalidades de la app.
Las pruebas de integración están enfocadas en cómo reaccionan varias piezas en conjunto
# Características
1. Fáciles de escribir
2. Fáciles de leer
3. Confiables
4. Rápidas
5. Principalmente unitarias
Las características se resumen en un concepto: AAA

# AAA
- Arrange (arreglar)
Es donde se prepara el estado inicial (el ambiente para realizar las pruebas), aquí se pueden inicializar variables y hacer las importaciones necesarias
- Act (actuar)
Aquí se aplican acciones o estímulos al sujeto de pruebas, se puede llamar métodos, simular clicks y/o realizar acciones sobre el paso anterior
- Assert (afirmar)
Aquí en donde se observa el comportamiento resultante de ese sujeto de pruebas, es decir, que se obtengan los resultados esperados
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
