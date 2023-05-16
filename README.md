## Scrapped

This is a simple web scraper that scrapes the [Bible Ref](https://www.bibleref.com//) website and returns what the Book, chapter and verse means.

## Usage

```node
const bible = require('bible-ref-scrapper');

bible('John 3:16').then((res) => {
    console.log(res);
});
```

## Output

```node
{
  book: 'John',
  chapter: '3',
  verse: '16',
  text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.'
}
```

## License

MIT
```

## License

MIT

## Author

[Tolulope Fakunle]




