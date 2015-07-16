var sampleDoc = {
  "id": "sample_doc_1",
  "schema": [
    "rich-text-article",
    "0.2.0"
  ],
  "nodes": {
    "body": {
      "type": "container",
      "id": "body",
      "nodes": [
        "p1",
        "p2",
        "p3"
      ]
    },
    "p1": {
      "type": "paragraph",
      "id": "p1",
      "content": 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis scelerisque ligula. Proin tristique ligula id magna finibus rhoncus. Quisque dictum viverra sapien, vel elementum metus condimentum nec. Donec ac tellus nunc. Nullam fermentum pharetra justo, accumsan tristique quam tempus a. Quisque vitae luctus velit. Praesent lacinia enim ex, sed pulvinar neque dictum ultricies. Sed est metus, bibendum sed suscipit ut, cursus ut mi. Pellentesque sagittis mi nisi, eu blandit metus congue id. Pellentesque eget magna porta, rutrum odio et, commodo lacus. Sed vitae vehicula ante. Quisque suscipit iaculis est, vitae aliquet lacus dictum ut. Nulla enim dolor, pulvinar at odio vitae, sollicitudin eleifend ex. Maecenas eget ligula eget sem efficitur consectetur nec vel sem. In massa mauris, consequat vitae enim eget, vehicula aliquet turpis.'
    },
    "p2": {
      "type": "paragraph",
      "id": "p2",
      "content": 'Proin in luctus sapien, ultrices commodo augue. Phasellus ultrices commodo augue, in blandit nibh euismod nibh vitae erat luctus ac. Aliquam euismod nibh vitae erat pulvinar, at semper libero tincidunt. Nulla finibus est ac consequat consequat. Sed at condimentum purus. Aliquam vulputate ipsum ut justo posuere, quis varius risus finibus. Ut scelerisque laoreet vehicula. Nullam gravida fringilla justo, nec efficitur nunc sagittis et. Suspendisse nibh ligula, imperdiet id interdum et, sollicitudin non mauris. Suspendisse potenti. Suspendisse luctus iaculis nulla sed efficitur. Nullam sed viverra metus. Etiam dictum blandit enim tincidunt maximus. Nullam tempus nibh at varius interdum.'
    },
    "p3": {
      "type": "paragraph",
      "id": "p3",
      "content": "Quisque et nulla justo. Nam tempor interdum mi, sit amet sollicitudin mauris ullamcorper malesuada. Aliquam ultricies eu sem vel dictum."
    },
    "strong1": {
      "id": "strong1",
      "type": "strong",
      "path": [
        "p1",
        "content"
      ],
      "startOffset": 20,
      "endOffset": 50
    },

    "h1": {
      "id": "h1",
      "type": "highlight",
      "container": "body",
      "startPath": ["p1", "content"],
      "startOffset": 100,
      "endPath": ["p2", "content"],
      "endOffset": 50
    },
  }
};

module.exports = sampleDoc;