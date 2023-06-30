
/* Configuracion del plugin de babel "babel-plugin-transform-remove-console" */
/* para no mostrar console.log en modo production */

const removeConsolePlugin = []
if (process.env.NODE_ENV === 'production') {
  removeConsolePlugin.push("transform-remove-console")
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: removeConsolePlugin /* plugin babal "babel-plugin-transform-remove-console" */
  
}


/* plugin instalacion */
/* "npm install babel-plugin-transform-remove-console --save-dev" */