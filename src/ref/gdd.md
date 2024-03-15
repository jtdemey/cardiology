# Cardiology
Play cards

## Contents
1. [Introduction](/introduction)
2. [Goals](/goals)
3. [Setting](/setting)
4. [Mechanics](/mechanics)
5. [User interface](/ui)
6. [Audio](/audio)

### <a href="/introduction">Introduction</a>
The Internet is kinda sick. In terms of social transmission of information, before that we had television, and before that, we had radio, and before that: cards. Do you think they're not analogous? Playing cards don't share information directly like these purported successors, but they indirectly facilitated sharing news throughout communities. In fact, I'd wager that playing cards wove a social fabric fundamentally unlike the eras of mass television and the Internet. Think about it: in the age of the web or the previous age of television, information came from some source, and then it gets disseminated to masses or niches all around the world, subverting physical borders. It's a bit of a top-down osmosis, and it's been optimized in many cases to be a conversation between two parties: the news corporations and the consumer of the news. Before radio was invented, cards helped us share news originating from print, and more importantly, allowed for discourse and the scrutiny of multiple perspectives while news was unfolding. Nowadays, this shared, social digesting of what is happening in the world seems to be either lacking or limited to openly manipulative, opaque platforms belonging to large corporations.

I'm monologuing. This project, *Cardiology*, is an attempt to meld the social aspect of card playing with the facilitative technology of the modern web. It is heavily inspired by Tabletop Simulator.


### <a href="/goals">Goals</a>
- Meld the social aspect of card playing with the facilitative technology of the modern web
- Allow friends from around the world to play card games with each other using virtual French playing card decks


### <a href="/setting">Setting</a>
Customization is fun, so the setting is customizable. The player can customize:
- The background/skybox
- The table
- The art on the deck of cards being used


### <a href="/mechanics">Mechanics</a>
The player interacts with their camera to facilitate visibility of what's happening on the table, as well as the deck(s) of cards on the table. Camera interaction is done through keyboard and mouse controls, and is performed solely on the client. Interacting with the deck involves the player selecting from discrete interactions that manipulate the physical position of cards in the deck. Deck interactions are agnostic to any card game's rules. Individual card games can provide batched deck interactions to ease play. Deck interactions are validated entirely on the server, and invalid interactions are disallowed via a 400 Bad Request response code.

#### Camera movement
Panning the camera is done using the arrow keys. The direction of the key pressed indicates the direction in which the camera will pan.
Zooming in and out is done with the + and - keys respectively.

#### Deck interactions


### <a href="/ui">User interface</a>


### <a href="/audio">Audio</a>
