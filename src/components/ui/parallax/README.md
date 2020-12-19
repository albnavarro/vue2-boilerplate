#PARALLAX
Il sistema di **parallax**  si divide in 3 componenti dipendenti dallo stesso **mixin** che ne definisce i comportamenti comuni.

lo scroll e resize sono reattivi e vengono gestiti sfruttando **vuex**. In aletrnativa si può usare una seconda istanza di vue presente in:
`src/wmap/WindowInstanceMap.js` andando semplicemente a cambiare i computed relativi per scroll, resize etc..


##MIXIN:
###src/mixin/ParallaxMixin.js
In questo mixin sono definiti tutte le props computed etcc.. comuni.
<br/><br/>

#### propierties
E' la props principale dove indicare il tipo di parallasse da utilizzare ( **verticale**, **orizzontale**, etc..), i sui valori verrano specificati nel detttaglio in ognuno dei tre componenti in maniera indipendente.
<br/><br/>

#### breackpoint / breackpointType

Fa riferimento alla utils `@/utils/mq.js`, definisce quando il componente è attivo in relazione alle dimensioni della viewport es:

`breackpointType="min"`<br/>
`breackpoint="x-small"`
<br/><br/>

#### renderAlways

Di default il calcolo viene effettuato solo quando l'elemento è visibile nella viewport, si può forzare il rendering sempre.<br/>
Utile per un componente in `position: fixed/sticky` che triggera un componente parente, che di fatto deve rimanere attivo in qualsiasi punto del documento si trovi.
<br/><br/>

#### reverse

Inverte il valore
<br/><br/>

#### ease

Il movimenti può essere lineare o `smooth`, di default è lineare.

`ease="smooth"`
<br/><br/>

#### smoothType
lo `smooth` viene creato in css o in javascript.
il comportamanto di default è in css

`smoothType="js"`
<br/><br/>

#### jsDelta

con uno `smooth` in javascript questa prop ne indica la velocità di spostamento da **1 a 10**
<br/><br/>

#### parentRef
E' possibile triggerare la posizione/altezza/larghezza di un elemento parente passandogli la corrispettiva `ref`, utile nel caso un elemento in `position: fixed/sticky` si debba sincronizzare con un elemento scrollabile
<br/><br/>

#### targetRef
E' possibile applicare il calcolo a un elemento diverse da stesso passandogli la `ref`.
<br/><br/>


##ParallaxClassic:
#### propierties
Le propietà gestite da questo componente sono:<br/>
`propierties = "vertical"`
`propierties = "horizontal"`
`propierties = "rotate"`
`propierties = "scale"`
`propierties = "border-width"`

**nota:**
**border-width** è solo un esempio di una propietà che non sfrutta il trasform, rimane sconsigliata.
<br/><br/>

#### range

Puo accettare valori tra **1 e 10**, definisce l'ampiezzza che deve avere il parallasse.
<br/><br/>

#### align

Allinea il **punto 0** a :<br/>
`start`: cima del documento
`top`: cima della viewport
`center`: centro della viewport
`bottom`:  base della viewport
`end`: base del documento
<br/><br/>

#### alignVh
Questa prop ha **priorità sulla precendete**<br/>
Se impostata permette di allineare il **punto 0** a un punto a scelta della viewport da **0 a 100** in completa libertà. In questo caso non si porta però allineare in maniera precisa il punto 0 alla cima o alla base del documento<br/>

`0`: cima della viewport
`100`: base della viewport
<br/><br/>

#### onSwitch

Dopo il **punto 0** è possibile:<br/>
`stop`: interrompere il movimento
`back`: invertire il movimento
<br/><br/>

##ParallaxOpacity:


#### propierties
L'unica propietà che può gestire il componente è `opacity`, non serve definirla, è stata mantenuta esclusivamante per uniformità rispetto al mixin.
<br/><br/>

#### align

Qiesta props è stata mantenuta  esclusivamente per allineare in maniera procisa il **punto 0** alla cima del documento.
**Se definita ha priorita sulla precedente**.
Il suo unico valore possibile sarà `start`
<br/><br/>

#### startPoint/endPoint
E possibile definire i due punti della viewport dove comincia e finisce l'animazione, di default l'opacita raggiungera il valore finale al centro della viewport

Es:<br/>
`:startPoint="100"`
100 indica la base della viewport

`:endPoint="0"`
0 indica il top della viewport
<br/><br/>

#### onSwitch
Dopo il **punto 0** sarà possibile invertire il parallasse sull'opacità:
In questo caso la proprietà `stop` non esiste in quanto implicita nella struttura base del componente.
Di defualt proprietà non è attiva

`back`: inverte l'opacità
<br/><br/>


##ParallaxStrict:
A differenza di `ParallaxClassic` questo componente gestisce movimenti precisi in realzione alle proprie misure di altezza e largezza o in realzione a misure di un altro elemento del DOM.
Qui la props `parentRef` risultera molto utile permettendo di creare delle **timeline di animazioni**

#### propierties:
propietà base di spostamento predefinite:

`propierties = "vertical"`
`propierties = "horizontal"`
`propierties = "rotate"`
`propierties = "scale"`
`propierties = "opacity"`
`propierties = "border-width"`
<br/><br/>

#### range
Si può definire un numero da 1 a x.
Il valore nel caso di spostamento `verticale o orizzontale` definisce una percentuale in rapporto all 'altezza/larghezza dell'elemento stesso. Es: <br/>
`:range = "50"` Il componente si sposterà esattamente del 50% della sua altezza/larghezza ( o del parentRef )<br/>
Nel caso di `rotate/border-width` il valore massimo sarà quello indicato nella proprietà, es: con un valore pari a  `90` e una propieta `rotate` il componente ruoterà di **90deg**.
Nel caso di `opacity` il valore tra **0 e 100** corrisponderà al corrispettivo di opacita tra **0 e 1**.
Nel caso di `scale` il valore **100** corrisponderà ad uno scale di **2**, il valore **200** a uno scale di **3**, e cosi via.

La durata dello spostamento è definita dall'altezza dell'elemento
<br/><br/>


#### static
Viene applicato solo il valore finale per tutta la transizione.
<br/><br/>

#### shiftOffset
il Punto di partenza di default fa riferimento a quello di entrata del componente ( o del parentRef ) nella viewport.
E possibile traslare il punto di partenza tramite questo attributo, es:<br/>
`:fixedOffset = "30"`<br/>
il movimento comincerà a **30vh** partendo dalla base della viewport
<br/><br/>

#### inward
Il primo valore applicato non sarà il minimo (  **0** ) ma il massimo ( **il valore di destinazione** )
<br/><br/>


#### disableEnd/disableStart
Di default al di sopra o al di sotto dello spazio attivo di calcolo viene applicato il valore minimo e massimo.
E' possibile non applicarli con queste due prop.
nell'esempio **/ParallaxTimeline** vengono usati per avere un flow di parallassi sulla proprietà border-width che viene apllicata all'ultimo nodo tramite la prop `targetRef`, questo per evitare che i componenti sovrascivano il valore a vicenda
<br/><br/>

##### TIPS:
Questo componente è pensato principalmente abbinato con la pros `:parentRef` che farà da guida sia che l'elemento si trovi in  `position: fixed/sticky` sia che segua il flow normale.<br/>
Se il componente segue il flow normale della pagina è' possibile pensare ad un elemento html fittizio ( magri in `postion:abolute` ) che semplicemente imposterà il valore di spostamento e durata della transizione, questo **trucco**, ci impedirà di dover aggiungere inutili pros.<br/>
Nella rotta `/ParallaxExample` è possibile vederne un esempio

Nella rotta `/ParallaxTimeline` è possibile vedere come innestare più componenti per creare una timeline di animazioni.
