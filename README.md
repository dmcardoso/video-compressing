# Aplicação para compressão de vídeos com aplicação de marca d'água

O seguinte aplicativo utiliza a biblioteca [FFmpeg](http://ffmpeg.org/), porém não é necessária sua instalação à parte 
deste repositório, graças à dependência [node-ffmpeg-installer](https://www.npmjs.com/package/@ffmpeg-installer/ffmpeg),
que gera umas instalação à partir do npm.
---

### Instalação
É necessário a clonagem do repositório e logo após:
Pré requisito: [Node.js](https://nodejs.org)

```
$ yarn install
```

ou 
```
$ npm install
```

---

### Utilização
A aplicação sincroniza duas pastas informadas à partir do arquivo `src/res/paths.json`, `input`, que se refere à pasta 
que será a pasta de origem dos arquivos a serem comprimidos e `output`, a pasta de destino dos vídeos a serem comprimidos.

A substituição da marca d'água se dá a partir da imagem `src/res/watermark.png`, levando em consideração que a imagem a 
ser incluída no vídeo manterá as mesmas proporções.

Após a instalação das dependências e coniguração das pastas no arquivo, basta executar o comando:
```
yarn start
```

ou 

```
npm start
```

---

### Informações

Alguns testes da compressão de vídeos:

| Vídeos | Original | Comprimido |
|--------|----------|------------|
| 1      | 9,25mb   | 325kb      |
| 2      | 9,29mb   | 463kb      |
| 3      | 9,94mb   | 566kb      |
| 4      | 11,3mb   | 1,638mb    |
| 5      | 703mb    | 40,639mb   |