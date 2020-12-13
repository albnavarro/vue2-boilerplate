# Parallax specs

## computationType

### fixed | default

```
computationType = "fixed"
```
### fixed:

Il component calcola il valore finale in base alla sua larghezza o altezza.<br/>
Di default il valore viene calcolato da quando l'elemento entra nella viewport fino a quando è completamante visibile.<br/>
In questo spazio il componente andrà dal punto 0 alla distanza massima che può percorrere.

#### fixedDistance

Si può definire un numero da 1 a x.
il valore verra applicare all propietà definita nella prop `propierties`
Il valore nel caso di spostamento `verticale o orizzontale` sara la percentuale dell 'altezza/larghezza dell'emento stesso.<br/><br/>
Nel caso di `rotate/border-width` il valore massimo sarà quello indicato nella propietà, es con un valore pari a  `90` e una propieta `rotate` il componente ruoterà di **90deg**<br/><br/>
Nel caso di `opacita` il valore tra **0 e 100** corrisponderà al corrispettivo di opacita tra **0 e 1**<br/><br/>
Nel caso di `scale` il valore **100** crrispondera ad uno sale di **2** il valore **200** a uno scale di **3** e cosi via

#### fixedDistanceImmutable

Viene applicato solo il valore finale per tutta la transizione.

#### fixedOffset

il Punto di partenza sara quello di entrata del componente nella viewport piu una percentuale della stessa. es:<br/><br/>
`:fixedOffset = "30"`<br/><br/>
il calcolo verra slittato a 30vh partendo dalla base della viewport

#### fixedStartFromEnd

Il primo vale applicato non sarà il minimo ma il massimo

#### fixedStartFromEnd / fixedStopBeforeStart

Di default al di sopra o al di sotto dello spazio attivo di calcolo vengono applicati i valori minimi e massimo.<br/>
E' possibile non applicarli con queste due prop.<br/>
nell'esempio **/ParallaxDefault** vengono usati per avere un flow di parallassi sulla propietà border-width.

<br/><br/>

### default:

Priopietà di default della prop `computationType`

#### defaultDistance

Il calcolo viene effettuato su un moltiplicatore da `1 a 10`

#### defaulAlign

E possibile fare in modo che il punto 0 sia allienato a :<br/><br/>
`start`: cima del documento<br/>
`top`: cima della viewport<br/>
`center`: centro della viewport<br/>
`bottom`:  base della viewport<br/>
`end`: base del documento<br/>
`NUMBER`: percentuale della viewport<br/>

#### defaultStopBack

Dopo il piunto è possibile:<br/><br/>
`toStop`: interrompere il movimento<br/>
`toBack`: invertire il movimento

nel caso in cui si usa la propietà `opacity`:<br/>
la propietà `toStop` è inutile, oltre un valore opacità 1 il componente non può andare.<br/>
la propietà `toBack` funziona correttamente come descritto nella prossima prop



#### defaultOpacityStart / defaultOpacityEnd

Nel caso di opcità e possibile definire separamante il punto (percentuale) della viewport in cui l'opacità parte il corrispettivo di arrivo<br/><br/>
Usando `defaultStopBack = "toBack"` un funzionamento corretto si ha solo impostando i valori a 0 e 100 ( da implementare. )

`:defaultOpacityStart="100"
:defaultOpacityEnd="0"`

<br/><br/>


### Prop comuni a fixed e default:


#### parentRef
E' possibile triggerare la posizione/altezza/largezza di un elmento parente passandogli la corrsipettiva ref, utile nel caso un elemento in `position: fixed/sticky` si debba sincronizzare con un elemento scrollabile


#### targetRef
E' possibile applicare il calcolo a un elemento deverse da stesso passandogli la ref.

#### breackpoint / breackpointType

Fa riferimento alla utils `@/utils/mq.js` es:

`breackpointType="min"`<br/>
`breackpoint="x-small"`

Il calcolo verrà effettuato dal breackpoint x-small in su.
Di default viene effettuato solo su dektop

#### renderAlways

Di default il calcolo viene effettuato soloquando l'lemento e visibile, si puo forzare il rendering sempre. utile per un componente in `position: fixed/sticky` che triggera un componente parente.

#### responsive | responsiveBreackpoint

E' possiible applicare il calcolo in `wW/wh` al di sottto di un determinato breackpoint

Fa riferimento alla utils `@/utils/mq.js`:

`:responsive = "true"`<br/>
`responsiveBreackpoint = "desktop"`

Il calcolo sara `vw` al di sotto e in `px` al di sopra del `breackpoint desktop`, utile per elementi wrappati in un container con max-width.

#### reverse

Inverte il valore

#### ease

Il movimenti puo essere lineare o smooth, di default è lineare.

`ease="smooth"`

#### smoothType
lo `smooth` viene creato in css o in javascript.
il comportamanto di default è in javascript

`smoothType="css"`


#### jsDelta

con uno smooth in javascript questa prop ne indica la velocità di spostamanto da **1 a 10**

#### propierties

propieta base di spostamanto predefinite:

`<propierties = "vertical"`<br/>
`<propierties = "horizontal"`<br/>
`<propierties = "rotate"`<br/>
`<propierties = "scale"`<br/>
`<propierties = "opacity"`<br/>
`<propierties = "border-width"`<br/>
