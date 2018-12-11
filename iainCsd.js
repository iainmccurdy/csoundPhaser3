const csd = `
<CsoundSynthesizer>
<CsInstruments>
ksmps = 32

gkJumpGap init 10
;jumping sound
instr 1
if i(gkJumpGap)<0.1 then
 turnoff
endif
gkJumpGap timeinsts
kAmp     expseg   0.001, 0.005, 1, p3-0.005, 0.0001 ; amplitude envelope
kCPS     expseg   150, 0.1, 105, p3-0.1, 1000       ; fundamental frequency
aSig     vco2     kAmp * 10, kCPS, 4, 0.2
kWobDep  expon    12, p3, 8
aCF      expseg   200, 0.1, 100, p3-0.1, 10000
aSig     buthp    aSig, aCF, 500
aSig     butbp    aSig, 1200, 200      
         outs     aSig, aSig
endin

;white noise machine
instr 2
    a1 rand .1
    a2 lpf18 a1, chnget:k("cutoff"), .5, 0
    outs a2, a2 
endin

;lightning kick triggers
instr 3
    kRand randh 1000, 4000, 2
    if metro(1) == 1 then
        event "i", 4, 0, 10
        chnset kRand, "triggerLights"
    endif
endin

;kick
instr 4
    a1 expon .5, p3, 0.001
    a2 expon 150, p3, 50
    a3 oscili a1, a2
    outs a3, a3
endin

;explosion
instr 5
    a1 expon 1, p3, 0.001
    a2 randi 1000, 500
    a3 oscili a1, a2
    outs a3, a3
endin

;random platforms
instr 6
k1 oscili 1, .05, -1, .1 
k2 oscili 1, .05, -1, .2
k3 oscili 1, .05, -1, .3
k4 oscili 1, .05, -1, .4 
k5 oscili 1, .05, -1, .5 
k6 oscili 1, .05, -1, .6 
k7 oscili 1, .05, -1, .7 
k8 oscili 1, .05, -1, .8 

chnset abs(k1), "platform0"
chnset abs(k2), "platform1"
chnset abs(k3), "platform2"
chnset abs(k4), "platform3"
chnset abs(k5), "platform4"
chnset abs(k6), "platform5"
chnset abs(k7), "platform6"
chnset abs(k8), "platform7"


aOut1 oscili k1, 100, 1
aOut2 oscili k2, 101, 2
aOut3 oscili k3, 102, 3
aOut4 oscili k4, 103, 4
aOut5 oscili k5, 104, 5
aOut6 oscili k6, 105, 6
aOut7 oscili k7, 106, 7
aOut8 oscili k8, 107, 8

aMix = aOut1+aOut2+aOut3+aOut4+aOut5+aOut6+aOut7+aOut8

outs aMix*.01, aMix*.01
endin

giSfn    ftgen 0, 0, 8192, 10, 1
giAttDec ftgen 0, 0, 4096, 16, 0, 4096, 4, 1




instr  10 ; rain
kenv   linsegr     0, 2, 1, 5, 0                       ; main amplitude envelope for both elements of the rain sound

; Pitter Patter
kTrig	dust        1,  150                              ; adjust density of individual drops
       schedkwhen  kTrig, 0, 0, p1+1, 0, 0.003, kenv*0.7

; Rain Roar
aNse	dust2    0.1 * kenv, 1000                       ; left channel 'roar'
aNse2	dust2    0.1 * kenv, 980                        ; right channel 'roar'
aNse	butlp    aNse, 1000                             ; lowpass filter
aNse2	butlp    aNse2, 1000
       outs     aNse, aNse2
endin

instr		11	; individual drops
iCPS1  random  8, 10                                   ; random initial pitch (oct format)
iCPS2  random  12, 13                                  ; random ending pitch (oct format) i.e. each droplet is like a little glissando
aCPS   expon   cpsoct(iCPS1), p3, cpsoct(iCPS2)          ; pitch envelope for each droplet
idB    random  -10, -32                                ; random amplitude (in decibels) 
aEnv   expon   1, p3, 0.001                            ; amplitude envelope for each droplet
aSig   poscil  aEnv * ampdbfs(idB) * p4 * 8, aCPS          ; droplet audio oscillator
aSig   atone   aSig, 4000                              ; soft highpass filter of the sound  
ipan   random  0, 1                                    ; random panning position
aL,aR	pan2		aSig, ipan                          
;		outs		aL, aR
endin

giSine  ftgen  0, 0, 4096, 10, 1





instr 20 ;  Trigger three bell notes
event_i "i", p1+1, 0, 4, cpsmidinn(76), 0.4
event_i "i", p1+1, 0.05, 4, cpsmidinn(79), 0.4
event_i "i", p1+1, 0.1, 4, cpsmidinn(84), 0.4
endin

instr 21 ; FM Tubular Bell
iCPS   =        p4                                   ; MIDI note (cycles per second)

iVel   =        ((p5 *0.7) + 0.03) ^ 2               ; MIDI key velocity (a corresponding value in the range 0.1 to 1)

kAmp   expsegr  1, 10, 0.00001, 10, 0.00001
kNdx   expsegr  5, 10, 0.001, 10, 0.001              ; amplitude envelope for operator 2. It is an 'r' type envelope so will wait for the key to be released before enacting the final segment.
a1     foscil   kAmp *iVel, iCPS, 1, 3.5, kNdx *iVel, giSine

kAmp   expsegr  1, 15, 0.00001, 15, 0.00001
kNdx   expsegr  7, 15, 0.0001, 15, 0.0001
a2     foscil   kAmp *iVel, iCPS, 1.003, 3.505, kNdx *iVel, giSine

kAmp   expsegr  1, 0.1, 0.00001, 0.1, 0.00001
kNdx   expsegr  6, 0.1, 0.01, 0.1, 0.01
a3     foscil   kAmp *iVel, 1, 323.5, iCPS*2.003, kNdx *iVel, giSine

aMix   =        (a1 + a2 + a3) * 0.2
       outs     aMix, aMix
endin





instr		30	; thunder
 p3         random    5, 10
 iDist      random    1, 1.7
 aenv		expseg	  0.01, 0.05, 1, 0.1, 0.5, p3-0.01, 0.01
 aNse		pinkish	  1.5
 kCF		expon     iDist, p3, 0.01
 kCFoct		randomh   2 * kCF, 6 * kCF, 20
 kCFEnv     expseg    2, 0.2, 1, p3-0.05, 0.01

 aNse		reson     aNse*3, a(cpsoct(kCFoct)), a(cpsoct(kCFoct)*5), 1

 aNse		butlp     aNse, 1000
 ipan		random    0, 1
 aNse       *=        aenv
 aL,aR      pan2      aNse,ipan
            outs      aL, aR
            chnmix    aL/2, "SendL"
            chnmix    aR/2, "SendR"
endin

instr   31 ; reverb/delay
aInL  chnget "SendL"
aInR  chnget "SendR"
      chnclear "SendL"
      chnclear "SendR"
aDelL    flanger   aInL, a(0.6), 0.3
aDelR    flanger   aInR, a(0.437), 0.3

aL,aR reverbsc  aInL+aDelL, aInR+aDelR, 0.6, 3000
;aL,aR freeverb  aInL+aDelL, aInR+aDelR, 0.1, 0.1
      outs      aL, aR
endin





giBuzz  ftgen  0, 0, 4096, 11, 160, 1, 0.96

instr 40 ; spit sound
aEnv  expseg   0.001, 0.001, 1, 0.003, 0.7, p3 - 0.001 - 0.003 - 0.003, 0.7, 0.003, 0.001 ; a gate-like amplitude envelope
aWobl gaussi   5, 1, 100                                   ; random pitch wobbling function 
iOct  random   6, 8
p3    =        p3 * cpsoct(7) / cpsoct(iOct)
aSig  poscil   aEnv, cpsoct(iOct) * semitone(aWobl), giBuzz   ; a buzz sound with a wobbly pitch (adjust the main frequency value 200 Hz)
aCF   expon    100, p3, 8000                               ; bandpass filter cutoff envelope
aSig  butbp    aSig, aCF, aCF                              ; bandpass filter the sound. Bandwidth just follows the centre frequency.
      outs     aSig, aSig
endin




instr 50 ; bounce
kGap  expon       0.4, p3, 0.01                  ; time gap between bounces decreases exponentially
kAmp  expon       1, p3, 0.0001                  ; amplitude of each bounce decreases exponentially 
      schedkwhen  1, kGap, 0, 2, 0, 0.02, kAmp  ; trigger individual bounce events
endin

instr 51
aCPS  expon       3000, p3, 200                  ; an exponential glissando downwards         
aAmp  expon       1, p3, 0.001                   ; an exponentially decaying amplitude envelope
aSig  poscil      aAmp * p4, aCPS                ; audio oscillator
      outs        aSig, aSig
endin




instr 60 ; walking
kxPos chnget "xPos"
kxPos lineto   kxPos, 0.02
kMove changed kxPos

kRate    randomi     1.5, 1.7, 2                    ; rate of footsteps
kTrig    metro       kRate * 4                         ; create footstep triggers
         schedkwhen  kTrig*kMove, 0, 0, p1+1, 0, 0.6, 1      ; 'heel' event
kGap     random      0.05, 0.08                     ; time gap between 'heel' and 'toe'
         schedkwhen  kTrig*kMove, 0, 0, p1+1, kGap, 0.6, 0.2 ; create 'toe' event
endin

instr  61
iAmp     exprand     2                              ; random amplitude
iAmp     =           iAmp + 4                       ; add offset (minimum)
iAtt     =           0.01                            ; envelope attack time
kEnv     expseg      0.001, iAtt, 1, p3-0.1, 0.001  ; amplitude envelope for the basic 'crunch' sound
kDens    expseg      1,    iAtt, 100, p3-0.1, 1     ; envelope for the density of the basic 'crunch' sound
aCrunch  dust2       kEnv*iAmp*p4*12, kDens            ; create the basic 'crunch' sound
iFrq     random      0.7, 1                         ; create a random scaling factor for the moogladder (resonant lowpass) filter
aCF      expseg      10, iAtt, 1000, p3-0.1, 1      ; create a cutoff frequency envelope for the moogladder (resonant lowpass) filter
aCrunch  moogladder  aCrunch, aCF * iFrq, 0.4       ; lowpass filter the cruch sound to create more of a 'clop' sound
aCrunch  buthp       aCrunch, 700                   ; highpass filter the 'clop' sound to remove some low frequencies
         outs        aCrunch, aCrunch
endin





instr 70 ; splat
 idur     exprand    0.1                         ; duration random range
 idur     +=         0.3                         ; duration offset (minimum)
 p3	      =          idur			              ; assign to p3
 imin	  random     6.5,6.8			          ; minimum frequency for splat filter (in oct)
 kDens    expon      500, p3, 10
 anoise	  dust2      10,kDens	                  ; some crackly noise, the density of which is dependent upon the fly population
 kcf	  random     cpsoct(imin),cpsoct(imin+7)  ; cutoff frequency is a random function moving to a new value every k-cycle
 kcfEnv   expon      0.5, p3, 2
 anoise	  moogladder anoise,kcf*kcfEnv,0.8	              ; filter the crackly noise using moogladder to give it a bit of squelch
 anoise	  buthp	     anoise, 500		          ; highpass filter to remove some of the lower frequencies
 aenv	  expon	     1,p3,0.01		              ; amplitude envelope which will give the splat sound a percussive shape
 anoise	  *=	     aenv			              ; apply envelope
          outs       anoise, anoise
endin




giSfn    ftgen 0, 0, 8192, 10, 1               ; source waveform for the fof2 burbles (a sine wave)
giAttDec ftgen 0, 0, 4096, 16, 0, 4096, 4, 1   ; envelope shape for fof2 grains

instr  80 ; swallow
; BURBLES
kFund   exprand  70       ; random pitch range of burbles
iFund   exprand  30
kFund   +=       expon:k(100,p3,1000) + iFund       ; minimum burble pitch
kris    =        0.05
kdur    exprand  0.005      ; random duration range of burbles
kdur    +=       0.01      ; minimum burble duration
kDens   randomi  20, 50, 5 ; randomly wandering burble density
kAmp    expon    1, p3, 0.001      ; random amplitude range

kGliss  exprand  0.1       ; burble glissando
kGliss  +=       2       ; minimum burble glissando
;ares   fof2     xamp, xfund, xform, koct, kband, kris,  kdur,      kdec,      iolaps, \ ifna, ifnb,    itotdur, kphs, kgliss [, iskip]
aBurble fof2     kAmp, kDens, kFund, 0,    20,    kris,  0.2+kdur,  kdur-kris,  200,      giSfn, giAttDec, 3600,   0, kGliss
        outs     aBurble, aBurble ; send burbles to the output
endin


instr 90 ; Bomb explosion
kAmp   expon  3, p3, 0.0001           ; amplitude envelope
kDens  expon  5000, p3, 1             ; density envelope
aNoise dust2  kAmp, kDens             ; create some dust noise
aSub   reson  aNoise*500, 20, 20, 1   ; sub bass filtered band
aMain  reson  aNoise*10, 100, 100, 1  ; main freq filtered band
aMix   sum    aMain + aSub            ; mix sub and main frequency bands
aMix   clip   aMix, 0, 0.95           ; clip the signal
aMix   tone   aMix*4, 2000              ; lowpass filter the signal
       outs   aMix, aMix        
endin

instr  100 ; game over
kCPS line 700, p3, 400
kVib lfo  60, 5
kEnv expseg 0.001,0.01,1,p3-0.02,1,0.01,0.001
a1 vco2 0.1, kCPS+kVib, 4, 0.5, 0, 0.1
a2 vco2 0.1, (kCPS+kVib)*2, 4, 0.5, 0, 0.1
a3 vco2 0.1, (kCPS+kVib)*4, 4, 0.5, 0, 0.1 
aMix =    (a1 + a2 + a3) * kEnv
     outs aMix, aMix
event_i "i", p1+1, 1.1, .2
event_i "i", p1+1, 1.3, .2
endin

giCos  ftgen  0,0,131072,11,1

instr  101
iFund  =        180
kFirst line     1, p3, 11
kEnv   linseg   0, 0.01, 1, p3-0.02, 1, 0.01, 0
aSig   gbuzz    0.1*kEnv, iFund, 11, kFirst, 0, giCos
aSig   butlp    aSig, a (iFund*kFirst) 
aSig   butlp    aSig, a (iFund*kFirst) 
       outs     aSig, aSig
endin

</CsInstruments>
<CsScore>
f1 0 1024 10 1
f2 0 1024 10 1 .5
f3 0 1024 10 1 .5 .2
f4 0 1024 10 1 .5 .2 .17
f5 0 1024 10 1 .5 .2 .17 .12
f6 0 1024 10 1 .5 .2 .17 .12 .10
f7 0 1024 10 1 .5 .2 .17 .12 .10 .8
f8 0 1024 10 1 .5 .2 .17 .12 .10 .8 .7


f0 z
</CsScore>
</CsoundSynthesizer>
`
csound.removeListener( "log" )

csound.playCSD(csd);
        