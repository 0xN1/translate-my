# translate-my

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

- Simple UI & UX
- Translate Malay, English, Bahasa pasar, Manglish, and vice versa
- Can switch model with any text-generation-inference model in huggingface

## Reference

- [mesolitica translation model](https://huggingface.co/mesolitica/translation-t5-small-standard-bahasa-cased-v2)
- [mesolitica malaysian-translation space](https://huggingface.co/spaces/mesolitica/malaysian-translation)
- [malaya docs](https://malaya.readthedocs.io/en/stable/load-augmentation-abstractive.html#Generate)
