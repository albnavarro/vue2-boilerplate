# OUTDATED,
# IL COMPONENTE E STATO DIVSO IN DUE SFRUTTANDO LO STESSO MIXIN. A BREVE IL NUOVO DOCUMETO

# Parallax specs

## computationType

### fixed | default

```
computationType = "fixed"
```
# fixed:

Il componente calcola il valore finale in base alla sua larghezza o altezza.<br/>
Di default il valore viene calcolato da quando l'elemento entra nella viewport fino a quando è completamante visibile.<br/>
In questo spazio il componente andrà dal punto 0 alla distanza massima che può percorrere.

#### fixedDistance

Si può definire un numero da 1 a x.
il valore verrà calcolato in base alla proprietà definita nella prop `propierties`
Il valore nel caso di spostamento `verticale o orizzontale` definisce una percentuale in rapporto all 'altezza/larghezza dell'elemento stesso.<br/><br/>
Nel caso di `rotate/border-width` il valore massimo sarà quello indicato nella proprietà, es con un valore pari a  `90` e una propieta `rotate` il componente ruoterà di **90deg**<br/><br/>
Nel caso di `opacity` il valore tra **0 e 100** corrisponderà al corrispettivo di opacita tra **0 e 1**<br/><br/>
Nel caso di `scale` il valore **100** corrisponderà ad uno sale di **2**, il valore **200** a uno scale di **3**, e cosi via

#### fixedDistanceImmutable

Viene applicato solo il valore finale per tutta la transizione.

#### fixedOffset

il Punto di partenza sarà quello di entrata del componente nella viewport più una percentuale della stessa. es:<br/><br/>
`:fixedOffset = "30"`<br/><br/>
il calcolo comincerà a 30vh partendo dalla base della viewport

#### fixedStartFromEnd

Il primo valore applicato non sarà il minimo ma il massimo

#### fixedStopAfterEnd / fixedStopBeforeStart

Di default al di sopra o al di sotto dello spazio attivo di calcolo vengono applicati i valori minimi e massimo.<br/>
E' possibile non applicarli con queste due prop.<br/>
nell'esempio **/ParallaxDefault** vengono usati per avere un flow di parallassi sulla proprietà border-width.
<br/>

##### TIPS:
`computationType = "fixed"` è pensato principalmente abbinato con la pros `:parentRef` che fara da guida sia che l'elemento si trovi in  `position: fixed/sticky` sia che segua il flow normale.<br/>
Se il componente segue il flow normale della pagina è' possibile pensare ad un elemento html fittizio ( maagri in `postion:abolute` ) che semplicemente imposterà il valore di spostamento e durata della transizione, questo `trucco`, ci impedirà di dover aggiungere inutili pros.<br/>
Nella rotta `/ParallaxDefault` e possibile vederne un esempio

Nella rotta `/ParallaxFixed` epossibile vedere come innestare piu componenti per creare una timeline di animazione su un oggetto in `position:sticky`

<br/><br/>

# default:

Prioprietà di default della prop `computationType`

#### defaultDistance

Il calcolo viene effettuato su un moltiplicatore da `1 a 10`

#### defaultAlign

E possibile fare in modo che il punto 0 sia allineato a :<br/><br/>
`start`: cima del documento<br/>
`top`: cima della viewport<br/>
`center`: centro della viewport<br/>
`bottom`:  base della viewport<br/>
`end`: base del documento<br/><br/>


#### defaultAlignVh

Questa prop ha priorità sulla precendete<br/>
Se impostata permette di allineare il punto 0 a un punto a scelta della viewport da 0 a 100.<br/>

`0`: cima della viewport<br/>
`100`: base della viewport<br/><br/>


#### defaultStopBack

Dopo il piunto è possibile:<br/><br/>
`toStop`: interrompere il movimento<br/>
`toBack`: invertire il movimento

nel caso in cui si usa la propietà `opacity`:<br/>
la propietà `toStop` è inutile, oltre un valore opacità 1 il componente non può andare.<br/>


#### defaultOpacityStart / defaultOpacityEnd

Nel caso di opacità è possibile definire separatamente il punto (percentuale) della viewport in cui l'opacità parte il corrispettivo punto di arrivo<br/><br/>

Es:<br/>
`:defaultOpacityStart="100"`<br/>
100 indica la base della viewport

`:defaultOpacityEnd="0"`<br/>
0 indica il top della viewport

<br/><br/>


# Prop comuni a fixed e default:


#### parentRef
E' possibile triggerare la posizione/altezza/larghezza di un elemento parente passandogli la corrispettiva `ref`, utile nel caso un elemento in `position: fixed/sticky` si debba sincronizzare con un elemento scrollabile


#### targetRef
E' possibile applicare il calcolo a un elemento diverse da stesso passandogli la `ref`.

#### breackpoint / breackpointType

Fa riferimento alla utils `@/utils/mq.js` es:

`breackpointType="min"`<br/>
`breackpoint="x-small"`

Il calcolo verrà effettuato dal breackpoint x-small in su.
Di default viene effettuato solo su dektop

#### renderAlways

Di default il calcolo viene effettuato solo quando l'elemento è visibile nella viewport, si può forzare il rendering sempre.<br/>
Utile per un componente in `position: fixed/sticky` che triggera un componente parente.

#### responsive | responsiveBreackpoint

E' possibile applicare il calcolo in `wW/wh` al di sotto di un determinato breackpoint

Fa riferimento alla utils `@/utils/mq.js`:

`:responsive = "true"`<br/>
`responsiveBreackpoint = "desktop"`

Il calcolo sarà `vw` al di sotto e in `px` al di sopra del `breackpoint desktop`, utile per elementi wrappati in un container con max-width.

#### reverse

Inverte il valore

#### ease

Il movimenti può essere lineare o `smooth`, di default è lineare.

`ease="smooth"`


#### smoothType
lo `smooth` viene creato in css o in javascript.
il comportamanto di default è in javascript

`smoothType="css"`


#### jsDelta

con uno `smooth` in javascript questa prop ne indica la velocità di spostamento da **1 a 10**

#### propierties

propietà base di spostamento predefinite:

`<propierties = "vertical"`<br/>
`<propierties = "horizontal"`<br/>
`<propierties = "rotate"`<br/>
`<propierties = "scale"`<br/>
`<propierties = "opacity"`<br/>
`<propierties = "border-width"` ( available only for `computationType:'fixed'`)<br/>
