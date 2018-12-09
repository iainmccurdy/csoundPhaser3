// Here we create our level using a simple array of strings.
// Each string represent a horizontal lines in our game world. 
// x: platform 
// r: rubble
// g: razor grass - deadly!
// m: moving platform - ping pongs 3 spaces right from starting position
// f: moving platform - same as above but falls under contact
// b: vertical bomb 
// h: horizontal bomb
// l: missile launcher
// u: upside down missile launcher
// h: good grass

var mainLevel = [
    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'x                     u                                         x',
    'x             b                                        xxxxxxxxxx',
    'x           xxrr            xxxxxxxxxxxxm    m  xxxxxxxxxxxxxxxxx',
    'x                    xxxxxx                             xxxxxxxxx',
    'x bxrb  xxxxxxxxm                                          xxxxxx',
    'x rxxr             xxxxxxxxxggggggggg                         xxx',
    'xxxxxx     xxxxxxxxxx      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'xxxxx        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxdxxxxxxxxxxxx',
    'xxxxxxggggggxxxxxxxxxxxxxxxxxx     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
];
