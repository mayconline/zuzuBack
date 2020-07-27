const mjml2html = require('mjml');
const Dirpath = require('path');

const options = {
  filePath: Dirpath.resolve(__dirname),
  beautify: true,
  minify: true,
};

module.exports = {
  register_template: async name =>
    mjml2html(
      `
      <mjml>
        <mj-head>
          <mj-title>Seja Bem Vindo</mj-title>
          <mj-include path="./shared/header.mjml" />
        </mj-head>
      <mj-body background-color="#FAFAFA">
        <mj-wrapper>
        </mj-wrapper>

        <mj-wrapper css-class="container">
          <mj-section background-color="#E52D27" padding="0">
            <mj-column width="35%">
              <mj-image src="https://res.cloudinary.com/dw9ca2cwa/image/upload/v1593728556/logotipos/zuzuLogo_dxyjxf.png" alt="ZuzuCakes" />
            </mj-column>
          </mj-section>

          <mj-section padding="0">
            <mj-column width="93%" padding="0">
              <mj-divider border-width="1px" border-style="solid" border-color="orange" />
            </mj-column>
            <mj-column width="100%" padding="0 0">
              <mj-text align="center" font-size="22px" line-height="30px" font-weight="600">Perfil Criado</mj-text>
            </mj-column>
            <mj-column width="93%" padding="0">
              <mj-divider border-width="1px" border-style="solid" border-color="orange" />
            </mj-column>
          </mj-section>

          <mj-section>
            <mj-column>
              <mj-text>
                Seja bem vindo ${name},
              </mj-text>
              <mj-text>
                Acesse nosso site e se delicie com nossos bolos deliciosos
                feitos especialmente para você!
              </mj-text>
              <mj-button width="100%" inner-padding="10px 183px" href="https://zuzucakes.netlify.app/" target="_blank" rel="noopener noreferrer">
                Acesse já
              </mj-button>
              <mj-text>
                Aguardamos sua avaliação,
                sua opnião é muito importante para nós.
              </mj-text>
              <mj-text>
                Desejamos que tenha um excelente dia.
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-wrapper>
        <mj-include path="./shared/footer.mjml" />
      </mj-body>
      </mjml>
`,
      options,
    ),
};
