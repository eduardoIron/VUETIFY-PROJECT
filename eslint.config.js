import vuetify from 'eslint-config-vuetify'

export default [

  ...vuetify(),

  
  {
    rules: {

      'eol-last': 'off',             
      'no-trailing-spaces': 'off',   
      'space-before-function-paren': 'off', 
    
      'vue/order-in-components': 'off',    
      'vue/attributes-order': 'off',      
      'vue/multi-word-component-names': 'off', 
      'vue/html-self-closing': 'off',     
      'vue/max-attributes-per-line': 'off' 
    }
  }
]