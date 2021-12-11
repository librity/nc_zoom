# [Nomad Coders - Zoom Clone]()

<p align="center">
  <img src=".github/">
</p>

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [License](#license)
- [Packages](#packages)
- [Docs](#docs)
- [Resources](#resources)

## About <a name = "about"></a>

A Zoom clone made with WebRTC and SocketIO.

- [Take the course too!](https://nomadcoders.co/noom)
- [Certificate of Completion]()

## Getting Started <a name = "getting_started"></a>

### Prerequisites

- `node >= 14.0.0`

### Installation

1. Clone this repo locally and install the required packages:

```bash
$ git clone https://github.com/librity/nc_zoom.git
$ cd nc_zoom
$ npm install
```

2. Start a development server:

```bash
$ npm run dev
```

3. Open http://localhost:3000 on your web browser.

#### Format

Format all source files with Prettier:

```bash
$ npm run format
```

## Usage <a name = "usage"></a>

### WebRTC Peer2Peer

<p align="center">
  <img src=".github/webrtc_diagram.png">
</p>

<p align="center">
  <img src=".github/webrtc_details.png">
</p>

The (SDP)offer contains the source address of the first peer
and details about the audio and video being shared,
like timing information and the encoding/decoding algorithm.

The second peer accepts this offer
and generates and answer.
The answer contains information about the second peer,
like its address and any ICE candidates.

An ICE candidate is a possible connection path between the peers.
As one can imagine, there are many different ways that two computers
can connect with one another, especially over long distances.
There are also considerations over which protocols are available (UDP, TCP)
and if any of the peers are using Network Address Translation.

Once both peers accepted the offer and answer
(which is like the contract of the peer to peer connection),
they choose a route/`icecandidate` that will hopefully offer
the fastest connection possible.

- https://developer.mozilla.org/en-US/docs/Glossary/SDP
- https://developer.mozilla.org/en-US/docs/Glossary/ICE
- https://en.wikipedia.org/wiki/Network_address_translation

## License <a name = "license"></a>

This project is [MIT licensed](LICENSE).

## Packages <a name = "packages"></a>

- https://github.com/remy/nodemon/
- https://github.com/babel/babel
- https://github.com/expressjs/express
- https://github.com/pugjs/pug
- https://github.com/websockets/ws
- https://github.com/socketio/socket.io
- https://github.com/socketio/socket.io-admin-ui

## Docs <a name = "docs"></a>

- https://babeljs.io/docs/en/
- https://pugjs.org/api/getting-started.html
- https://expressjs.com/en/guide/routing.html
- https://socket.io/docs/v4/
- https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
- https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API

## Resources <a name = "resources"></a>

- https://www.w3schools.com/nodejs/met_path_join.asp
- https://andybrewer.github.io/mvp/?ref=producthunt
- https://admin.socket.io

### Vanilla Javascript

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

### WebRTC

- https://github.com/webrtc
- https://github.com/webrtc/apprtc
- https://github.com/webrtc/samples
- https://github.com/webrtc/test-pages

### CSS

- https://stackoverflow.com/questions/15310158/add-border-radius-to-webcam-video-element
- https://css-tricks.com/almanac/properties/b/border-radius/
