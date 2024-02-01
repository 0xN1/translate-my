# translate-my

![translate-my-1](https://github.com/0xN1/translate-my/assets/9148847/7f6454ca-0b51-4695-a5bf-0ffcfc1b2d72)

A translation tool based on mesolitica/malaysian-translation on huggingface. Cover Bahasa Melayu > English and vice versa with support for Bahasa Pasar, Manglish and others.

## Development

```bash
# clone the repo
git clone https://github.com/0xn1/translate-my.git

# navigate to the dir
cd translate-my

# install dependencies
bun i

# setup env file
mv .env.local.example .env.local

# run dev in port 1331
bun run dev --port 1331
```

## Token

You need to get [Hugging Face access token](https://huggingface.co/settings/tokens) and paste it in the .env.local file.

```
HF_TOKEN=[YOUR_ACCESS_TOKEN]
```

## Stack

- NextJS
- TailwindCSS
- Huggingface.js

## Features

![translate-my-2-pwa](https://github.com/0xN1/translate-my/assets/9148847/ba808b88-7fcb-42e4-a1b3-5b1579f18fb7)

- PWA (Add to Home Screen on mobile / Install app in web)
- Simple UI & UX
- Translate Malay, English, Bahasa pasar, Manglish, and vice versa
- API endpoint at `api/translate`
- Can switch model with any text-generation-inference model in huggingface

## API

### Endpoint

`/api/translate`

### Query Parameter

`text` : input text to be translated (URI encoded)

`lang` : language (pick from options below)

### Language options

> English :
> `Inggeris`

> Malay :
> `Malay`

> Bahasa Pasar :
> `pasar Melayu`

> Manglish :
> `Manglish`

### Example

```
/api/translate?text=ikan%20goreng%20sedap%20tak%3F%20banyak%20ke%20merkuri%20dalam%20tu%3F&lang=Inggeris
```

will return

```json
{
  "generated_text": "Is fried fish delicious? Is there a lot of mercury in it?"
}
```

## Reference

- [mesolitica translation model](https://huggingface.co/mesolitica/translation-t5-small-standard-bahasa-cased-v2)
- [mesolitica malaysian-translation space](https://huggingface.co/spaces/mesolitica/malaysian-translation)
- [malaya docs](https://malaya.readthedocs.io/en/stable/load-augmentation-abstractive.html#Generate)
