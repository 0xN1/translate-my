# translate-my

![translate-my-1](https://github.com/0xN1/translate-my/assets/9148847/7f6454ca-0b51-4695-a5bf-0ffcfc1b2d72)

Una herramienta de traducción basada en mesolitica/malaysian-translation en huggingface. Cubre Bahasa Melayu > Inglés y viceversa, con soporte para Bahasa Pasar, Manglish y otros.

## Desarrollo

```bash
# clonar el repo
git clone https://github.com/0xn1/translate-my.git

# navegar al directorio
cd translate-my

# instalar dependencias
bun i

# configurar archivo env
mv .env.local.example .env.local

# ejecutar dev en el puerto 1331
bun run dev --port 1331
```

## Token

Necesitas obtener un [Hugging Face access token](https://huggingface.co/settings/tokens) y pegarlo en el archivo .env.local.

```
HF_TOKEN=[YOUR_ACCESS_TOKEN]
```

## Stack

- NextJS
- TailwindCSS
- Huggingface.js

## Características

![translate-my-2-pwa](https://github.com/0xN1/translate-my/assets/9148847/ba808b88-7fcb-42e4-a1b3-5b1579f18fb7)

- PWA (Añadir a pantalla de inicio en móvil / Instalar app en web)
- UI & UX simple
- Traducción de malayo, inglés, Bahasa pasar, Manglish y viceversa
- Endpoint de API en `api/translate`
- Se puede cambiar el modelo por cualquier modelo de text-generation-inference en huggingface

## API

### Endpoint

`/api/translate`

### Parámetros de Consulta (Query Parameters)

`text` : texto de entrada a traducir (URI encoded)

`lang` : idioma (elegir entre las opciones de abajo)

### Opciones de idioma

> Inglés :
> `Inggeris`

> Malayo :
> `Malay`

> Bahasa Pasar :
> `pasar Melayu`

> Manglish :
> `Manglish`

### Ejemplo

```
/api/translate?text=ikan%20goreng%20sedap%20tak%3F%20banyak%20ke%20merkuri%20dalam%20tu%3F&lang=Inggeris
```

devolverá

```json
{
  "generated_text": "Is fried fish delicious? Is there a lot of mercury in it?"
}
```

## Referencias

- [mesolitica translation model](https://huggingface.co/mesolitica/translation-t5-small-standard-bahasa-cased-v2)
- [mesolitica malaysian-translation space](https://huggingface.co/spaces/mesolitica/malaysian-translation)
- [malaya docs](https://malaya.readthedocs.io/en/stable/load-augmentation-abstractive.html#Generate)
