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
    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'x                     u                                    b     x ',
    'x             b              b                         xxxxxxxxxx ',
    'x           xxrr            xxxxxxxxxxxx        xxxxxxxxxxxxxxxxxx',
    'x                    xxxxxx                  m          xxxxxxxxxx',
    'x bxrb  xxxxxxxxm                                          xxxxxxx',
    'x rxxr             x xxxxxxxggggggggg  l   m           b     bxxxx',
    'xxxxxx     xxxxxxxxx      bxxxxxxxxxx  xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'xxxxx   m     xxxxxxxxxxxxxxxxxxxxxxxr   xxxxxxxxxxxxxxxxxxxxxxxxx',
    'xxxxxxggggggxxxxxxxx xxxxxxxxxxx       xxxxxxxxxxxxxd       m   b  ',
    'xxxxxxxxxxxxxxxxxxxx xxx  bbb    rxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'xxxxxxxxxxxxxxxxxxxx      xxx   rxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
];
