# @gavant/ember-page-layout

This addon is used to change a sidebar/header/footer depending on what page your viewing

## Compatibility

-   Ember.js v3.24 or above
-   Embroider or ember-auto-import v2
-   Node.js v14 or above

## Installation

```
ember install @gavant/ember-page-layout
```

## Usage

```
//application template
<Page::Header::Container>

<Page::Header>Logged in Page Header</Page::Header>
```

```
//Logged out Page template
<Page::Header>Logged Out Page Header</Page::Header>
```

```
//Logged in Page template
//Nothing is needed here as your application page header will render once logged in
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
