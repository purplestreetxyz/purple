export const locales = ['es', 'ca', 'en', 'fr'] as const

export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  es: 'ES',
  ca: 'CA',
  en: 'EN',
  fr: 'FR',
}

const es = {
  nav: {
    whatWeDo: 'Qué hacemos',
    about: 'Sobre mí',
    contact: 'Contacto',
    menu: 'Menú',
    mainLabel: 'Navegación principal',
    homeLabel: 'Purple Street — inicio',
    instagramLabel: 'Purple Street en Instagram',
    languageLabel: 'Idioma',
  },
  home: {
    hero: {
      line1: 'Estudio de arquitectura y urbanismo',
      line2: 'con mirada de género interseccional.',
    },
    workedWith: 'Hemos trabajado con',
    services: {
      title: 'Qué hacemos',
      story: [
        'Purple Street empezó como un proyecto de divulgación sobre el espacio público desde una mirada de género interseccional. A través de contenidos y marchas urbanas con personas vinculadas al territorio, fue creciendo una comunidad con ganas de observar y transformar la ciudad de otra manera.',
        'Hoy combinamos procesos de participación con colectivas y administraciones, talleres para universidades, profesionales, adolescencia e infancia —una etapa que nos interesa especialmente porque permite mirar el entorno sin tantas capas aprendidas— y el desarrollo de herramientas digitales sociales. En paralelo, investigamos cómo los cuerpos de las mujeres habitan y son condicionados por el espacio urbano.',
      ],
      externalLabel: 'Ver Instagram',
      internalLabel: 'Ver proyectos',
      items: {
        outreach: {
          title: 'Divulgación',
          text: 'Acercamos el urbanismo y la mirada de género a públicos y contextos diversos.',
        },
        workshops: {
          title: 'Talleres',
          text: 'Diseñamos experiencias de aprendizaje para universidades, institutos e infancia.',
        },
        participation: {
          title: 'Participación ciudadana',
          text: 'Facilitamos procesos ciudadanos que convierten experiencias cotidianas en propuestas.',
        },
        walks: {
          title: 'Marchas urbanas',
          text: 'Leemos la ciudad caminando, compartiendo memorias, cuidados y necesidades.',
        },
        research: {
          title: 'Investigación',
          text: 'Exploramos relaciones entre cuerpxs, espacio público, memoria y representación.',
        },
        apps: {
          title: 'Apps sociales',
          text: 'Creamos herramientas digitales que hacen más fácil participar, compartir y cuidar lo común.',
        },
      },
    },
    chapters: {
      workshops: {
        title: 'Talleres',
        university: {
          title: 'Urbanism & Gender Equality Workshop',
          caption: 'Universidades de Ginebra, Lausana, Friburgo y Zúrich · Desde 2022',
          mediaLabel: 'Talleres en universidades',
          paragraphs: [
            'Desde 2022, en colaboración con la cooperativa Equal Saree, facilitamos talleres de urbanismo con mirada de género en las universidades de Ginebra, Lausana, Friburgo y Zúrich. Combinamos teoría del urbanismo feminista con herramientas de observación y reflexión individual y colectiva. A partir de experiencias cotidianas, el alumnado comparte perspectivas diversas, analiza los espacios que habita y formula propuestas para transformarlos.',
          ],
        },
        mapping: {
          title: 'Mapeo participativo con infancia',
          caption: 'Millorem el barri · Barcelona 2026',
          link: 'Ver programa oficial',
          paragraphs: [
            'En el marco del festival «Capital Mundial de l’Arquitectura» en Barcelona, se han planteado talleres participativos dirigidos a la infancia. La actividad se centra en el mapeo colaborativo: a partir de un gran plano, se describen los itinerarios cotidianos y se registran los puntos fuertes y débiles del entorno según su experiencia. El resultado es un conjunto de propuestas que pone en valor la mirada de la infancia, refuerza su vínculo con el entorno y fomenta una lectura crítica del espacio construido.',
          ],
        },
        fanzines: {
          title: 'Fanzines feministas',
          caption: 'Fanzines feministas · Berlín 2025',
          mediaLabel: 'Fanzines feministas',
          paragraphs: [
            'Taller de expresión creativa realizado con niñas, niños y adolescentes de 7 a 16 años en el marco del Día de la Mujer Trabajadora. A través del dibujo, la pintura y el collage, descubren referentes feministas, construyen relatos propios y los transforman en publicaciones manuales individuales o colectivas que posteriormente se exponen.',
          ],
        },
        accessibility: {
          title: 'Arquitectura a les Aules',
          caption: 'INS Cavall Bernat · Terrassa 2025',
          mediaLabel: 'Arquitectura en las aulas: accesibilidad',
          link: 'Ver proyecto Arquiescola',
          paragraphs: [
            'En el marco de Arquiescola, un programa que acerca la arquitectura a escuelas e institutos, esta edición abordó las barreras arquitectónicas. A través de diferentes recorridos por su centro educativo, el alumnado analizó la accesibilidad de los espacios y desarrolló colectivamente propuestas para mejorarlos.',
          ],
        },
      },
      walks: {
        title: 'Marchas urbanas',
        barcelona: {
          city: 'Barcelona',
          caption: 'Jane’s Walk · Barcelona 2026',
          link: 'Ver programa oficial',
          paragraphs: [
            'En el marco del festival «Capital Mundial de l’Arquitectura» se han organizado Jane’s Walks en los diez distritos de Barcelona.',
            'Cada itinerario promueve la conversación y la exploración compartida del entorno. La propuesta sitúa en el centro la vida cotidiana —el espacio público, los cuidados, el comercio local y la memoria— y fomenta la pluralidad de miradas para construir un relato colectivo.',
          ],
        },
        manresa: {
          city: 'Manresa',
          caption: 'Jane’s Walk · Manresa 2025',
          mediaLabel: 'Jane’s Walk Manresa',
          paragraphs: [
            'En 2025 celebramos una Jane’s Walk en Manresa. Tuvimos la suerte de caminar junto a quien había ejercido como urbanista municipal de la ciudad durante muchos años y conversar sobre sus transformaciones urbanas, su memoria y los retos que todavía permanecen abiertos.',
          ],
        },
        sion: {
          city: 'Sion',
          caption: 'Jane’s Walk · Sion 2021–2023',
          link: 'Conocer Jane’s Walk',
          paragraphs: [
            'Jane’s Walk es un movimiento ciudadano de paseos conversados gratuitos inspirado en Jane Jacobs. En 2021, 2022 y 2023 organizamos varias ediciones en Sion, Suiza. Cada recorrido se construyó junto a comercios locales, centros de arte, artesanas y artesanos, poniendo en valor su conocimiento y su relación cotidiana con el territorio. Estas colaboraciones permitieron compartir experiencias, detectar necesidades y construir una lectura colectiva de la ciudad.',
          ],
        },
      },
      participation: {
        title: 'Participación ciudadana',
        municipal: {
          title: 'Escala municipal',
          caption: 'Transformación de espacios públicos',
          alt: 'Sesión abierta sobre espacios cotidianos',
          paragraphs: [
            'En colaboración con distintos estudios, desarrollamos procesos participativos para transformar espacios públicos de uso cotidiano, como calles, plazas y parques. Diseñamos y facilitamos sesiones de diagnóstico, elaboración de propuestas y retorno, incorporando las experiencias y prioridades de la ciudadanía en cada fase del proyecto.',
          ],
        },
        territorial: {
          title: 'Escala territorial',
          caption: 'Planificación urbana y territorial',
          alt: 'Mapa territorial trabajado colectivamente',
          paragraphs: [
            'En colaboración con estudios como Territoris XLM y Equal Saree, desarrollamos procesos participativos vinculados a la planificación urbana y territorial en diversos municipios, entre ellos los POUP de Andorra la Vella y Sant Julià de Lòria. Son proyectos de larga duración, articulados mediante talleres temáticos sucesivos, en los que mapas y recorridos permiten incorporar el conocimiento cotidiano de la ciudadanía a la planificación.',
          ],
        },
        ecosystemic: {
          title: 'Escala ecosistémica',
          caption: 'Biodiversidad y espacios verdes · Biowater',
          alt: 'Taller intergeneracional sobre espacios verdes',
          link: 'Ver proyecto Biowater',
          paragraphs: [
            'Junto con ISGlobal y el colectivo Replantegem, desarrollamos un proceso participativo para conocer cómo imagina la ciudadanía los futuros espacios verdes de Barcelona. Mediante sesiones con colectivas de edades y contextos diversos, recogemos distintas experiencias y necesidades para plantear espacios verdes más inclusivos, saludables y adaptados a quienes los utilizan.',
          ],
        },
      },
      research: {
        title: 'Investigación',
        project: {
          title: 'Cuerpas',
          caption: 'CUERPAS · Colombia 2023',
          videoLabel: 'Fragmento audiovisual del proyecto CUERPAS',
          link: 'Ver CUERPAS en Instagram',
          paragraphs: [
            'Realizamos trabajo de campo en Bogotá, Medellín, Cali y el Chocó, compartiendo espacios, recorridos y conversaciones con colectivas de mujeres escritoras, poetas, diseñadoras y muralistas. Juntas exploramos cómo sus cuerpas habitan el espacio público: las formas de ocuparlo, recorrerlo, narrarlo y transformarlo; las tensiones entre seguridad y autonomía; y las huellas que cada experiencia deja en la ciudad. CUERPAS reúne estas voces para construir un nuevo relato urbano.',
          ],
        },
      },
      apps: {
        title: 'Apps sociales',
        project: {
          title: 'Xibarri',
          caption: 'xibarri · App ciudadana',
          alt: 'Cuatro pantallas de xibarri: incidencia, mapa, ranking y perfil',
          link: 'Descubrir xibarri',
          paragraphs: [
            'Xibarri es una herramienta digital que permite localizar incidencias en el mapa, comunicarlas fácilmente a la entidad correspondiente y compartirlas con vecinas y vecinos. También permite publicar propuestas y conocer cómo percibe la ciudadanía los espacios que habita, haciendo visibles sus necesidades, preocupaciones e ideas de mejora.',
          ],
        },
      },
    },
    about: {
      title: 'Urbanista feminista',
      photoAlt: 'Laura Mayer, arquitecta y urbanista',
      paragraphs: [
        'Purple Street nace de una pregunta: ¿para quién están pensadas nuestras ciudades? Mientras trabajaba en un estudio de urbanismo y cursaba un máster en urbanismo, la lectura de Jane Jacobs me ayudó a reconocer que el espacio urbano no había sido diseñado desde las experiencias y necesidades de las mujeres.',
        'Empecé entonces a investigar y a construir mi propio atlas de referentes: urbanistas y geógrafas que habían observado y explicado la ciudad desde otras miradas. Ese recorrido me llevó a estudiar el Máster en Estudios de Género de la Universitat de Barcelona y a incorporar una mirada de género interseccional a mi práctica.',
        'He vivido y trabajado entre Alemania, Suiza y Barcelona, desarrollando talleres, marchas urbanas y procesos participativos con universidades, administraciones y colectivas. Entiendo la ciudad como una construcción compartida: un espacio que podemos hacer más seguro, más divertido, más cuidador y más sostenible para quienes lo habitan hoy y para las generaciones futuras.',
      ],
      manifestoLink: 'Leer el manifiesto',
    },
    contact: 'Contacto',
  },
  manifesto: {
    pageTitle: 'Manifiesto',
    description: 'Los principios de Purple Street para una ciudad accesible, cuidadora, segura y representativa.',
    back: 'Volver a Purple Street',
    streetLabel: 'Una purple street',
    streetAlt: 'Ilustración de una calle con vegetación, juego, cuidados y espacios colectivos',
    intro: 'Cuando nos ponemos las «gafas lilas», activamos una mirada de género interseccional sobre los espacios: observamos si responden a las necesidades de las personas que los usan, si son inclusivos, respetan distintos ritmos, facilitan los cuidados y reconocen la diversidad. Estos indicadores nos ayudan a leerlos, cuestionarlos y transformarlos.',
    principles: [
      {
        title: 'Accesibilidad',
        text: 'Todas las personas pueden orientarse y circular con autonomía, independientemente de su movilidad, edad o diversidad funcional. El espacio indica dónde estás, hacia dónde vas y cómo llegar.',
      },
      {
        title: 'Seguridad informal',
        text: 'La seguridad aparece cuando hay ojos en la calle: plantas bajas activas, usos diversos, buena iluminación, recorridos visibles y ausencia de rincones oscuros.',
      },
      {
        title: 'Cuidados',
        text: 'La calle permite cuidar, acompañar y descansar. Hay bancos, sombra, baños públicos accesibles y espacios cómodos para la infancia y para quienes cuidan.',
      },
      {
        title: 'Confort',
        text: 'Vegetación, agua potable, sombra y materiales permeables ayudan a estar mejor, drenar lluvias fuertes y evitar superficies que queman. El confort es salud urbana.',
      },
      {
        title: 'Memoria y representación',
        text: 'Murales, historia cotidiana, arte local y lugares de encuentro sin consumo hacen sitio a mujeres, colectivas disidentes y otras vidas históricamente invisibilizadas.',
      },
      {
        title: 'Participación',
        text: 'La ciudad se construye con quienes la habitan. Las soluciones deben situarse en un territorio concreto y responder a las necesidades de una población concreta.',
      },
    ],
  },
}

const ca: typeof es = {
  nav: {
    whatWeDo: 'Què fem',
    about: 'Sobre mi',
    contact: 'Contacte',
    menu: 'Menú',
    mainLabel: 'Navegació principal',
    homeLabel: 'Purple Street — inici',
    instagramLabel: 'Purple Street a Instagram',
    languageLabel: 'Idioma',
  },
  home: {
    hero: {
      line1: "Estudi d’arquitectura i urbanisme",
      line2: 'amb mirada de gènere interseccional.',
    },
    workedWith: 'Hem treballat amb',
    services: {
      title: 'Què fem',
      story: [
        'Purple Street va començar com un projecte de divulgació sobre l’espai públic des d’una mirada de gènere interseccional. A través de continguts i marxes urbanes amb persones vinculades al territori, va créixer una comunitat amb ganes d’observar i transformar la ciutat d’una altra manera.',
        'Avui combinem processos de participació amb col·lectives i administracions, tallers per a universitats, professionals, adolescents i infants —una etapa que ens interessa especialment perquè permet mirar l’entorn sense tantes capes apreses— i el desenvolupament d’eines digitals socials. En paral·lel, investiguem com els cossos de les dones habiten i estan condicionats per l’espai urbà.',
      ],
      externalLabel: 'Veure Instagram',
      internalLabel: 'Veure projectes',
      items: {
        outreach: {
          title: 'Divulgació',
          text: 'Acostem l’urbanisme i la mirada de gènere a públics i contextos diversos.',
        },
        workshops: {
          title: 'Tallers',
          text: 'Dissenyem experiències d’aprenentatge per a universitats, instituts i infància.',
        },
        participation: {
          title: 'Participació ciutadana',
          text: 'Facilitem processos ciutadans que converteixen experiències quotidianes en propostes.',
        },
        walks: {
          title: 'Marxes urbanes',
          text: 'Llegim la ciutat caminant, compartint memòries, cures i necessitats.',
        },
        research: {
          title: 'Investigació',
          text: 'Explorem relacions entre cossos, espai públic, memòria i representació.',
        },
        apps: {
          title: 'Apps socials',
          text: 'Creem eines digitals que fan més fàcil participar, compartir i cuidar allò comú.',
        },
      },
    },
    chapters: {
      workshops: {
        title: 'Tallers',
        university: {
          title: 'Urbanism & Gender Equality Workshop',
          caption: 'Universitats de Ginebra, Lausana, Friburg i Zúric · Des de 2022',
          mediaLabel: 'Tallers en universitats',
          paragraphs: [
            'Des de 2022, en col·laboració amb la cooperativa Equal Saree, facilitem tallers d’urbanisme amb mirada de gènere a les universitats de Ginebra, Lausana, Friburg i Zúric. Combinem teoria de l’urbanisme feminista amb eines d’observació i reflexió individual i col·lectiva. A partir d’experiències quotidianes, l’alumnat comparteix perspectives diverses, analitza els espais que habita i formula propostes per transformar-los.',
          ],
        },
        mapping: {
          title: 'Mapatge participatiu amb infants',
          caption: 'Millorem el barri · Barcelona 2026',
          link: 'Veure el programa oficial',
          paragraphs: [
            'En el marc del festival «Capital Mundial de l’Arquitectura» a Barcelona, s’han plantejat tallers participatius adreçats a la infància. L’activitat se centra en el mapatge col·laboratiu: a partir d’un gran plànol, es descriuen els itineraris quotidians i es registren els punts forts i febles de l’entorn segons la seva experiència. El resultat és un conjunt de propostes que posa en valor la mirada de la infància, reforça el seu vincle amb l’entorn i fomenta una lectura crítica de l’espai construït.',
          ],
        },
        fanzines: {
          title: 'Fanzins feministes',
          caption: 'Fanzins feministes · Berlín 2025',
          mediaLabel: 'Fanzins feministes',
          paragraphs: [
            'Taller d’expressió creativa realitzat amb nenes, nens i adolescents de 7 a 16 anys en el marc del Dia de la Dona Treballadora. A través del dibuix, la pintura i el collage, descobreixen referents feministes, construeixen relats propis i els transformen en publicacions manuals individuals o col·lectives que posteriorment s’exposen.',
          ],
        },
        accessibility: {
          title: 'Arquitectura a les Aules',
          caption: 'INS Cavall Bernat · Terrassa 2025',
          mediaLabel: 'Arquitectura a les aules: accessibilitat',
          link: 'Veure el projecte Arquiescola',
          paragraphs: [
            'En el marc d’Arquiescola, un programa que acosta l’arquitectura a escoles i instituts, aquesta edició va abordar les barreres arquitectòniques. A través de diferents recorreguts pel seu centre educatiu, l’alumnat va analitzar l’accessibilitat dels espais i va desenvolupar col·lectivament propostes per millorar-los.',
          ],
        },
      },
      walks: {
        title: 'Marxes urbanes',
        barcelona: {
          city: 'Barcelona',
          caption: 'Jane’s Walk · Barcelona 2026',
          link: 'Veure el programa oficial',
          paragraphs: [
            'En el marc del festival «Capital Mundial de l’Arquitectura» s’han organitzat Jane’s Walks als deu districtes de Barcelona.',
            'Cada itinerari promou la conversa i l’exploració compartida de l’entorn. La proposta situa al centre la vida quotidiana —l’espai públic, les cures, el comerç local i la memòria— i fomenta la pluralitat de mirades per construir un relat col·lectiu.',
          ],
        },
        manresa: {
          city: 'Manresa',
          caption: 'Jane’s Walk · Manresa 2025',
          mediaLabel: 'Jane’s Walk Manresa',
          paragraphs: [
            'L’any 2025 vam celebrar una Jane’s Walk a Manresa. Vam tenir la sort de caminar al costat de qui havia exercit com a urbanista municipal de la ciutat durant molts anys i conversar sobre les seves transformacions urbanes, la seva memòria i els reptes que encara continuen oberts.',
          ],
        },
        sion: {
          city: 'Sion',
          caption: 'Jane’s Walk · Sion 2021–2023',
          link: 'Conèixer Jane’s Walk',
          paragraphs: [
            'Jane’s Walk és un moviment ciutadà de passejades conversades gratuïtes inspirat en Jane Jacobs. El 2021, 2022 i 2023 vam organitzar diverses edicions a Sion, Suïssa. Cada recorregut es va construir amb comerços locals, centres d’art, artesanes i artesans, posant en valor el seu coneixement i la seva relació quotidiana amb el territori. Aquestes col·laboracions van permetre compartir experiències, detectar necessitats i construir una lectura col·lectiva de la ciutat.',
          ],
        },
      },
      participation: {
        title: 'Participació ciutadana',
        municipal: {
          title: 'Escala municipal',
          caption: 'Transformació d’espais públics',
          alt: 'Sessió oberta sobre espais quotidians',
          paragraphs: [
            'En col·laboració amb diferents estudis, desenvolupem processos participatius per transformar espais públics d’ús quotidià, com carrers, places i parcs. Dissenyem i facilitem sessions de diagnosi, elaboració de propostes i retorn, incorporant les experiències i prioritats de la ciutadania en cada fase del projecte.',
          ],
        },
        territorial: {
          title: 'Escala territorial',
          caption: 'Planificació urbana i territorial',
          alt: 'Mapa territorial treballat col·lectivament',
          paragraphs: [
            'En col·laboració amb estudis com Territoris XLM i Equal Saree, desenvolupem processos participatius vinculats a la planificació urbana i territorial en diversos municipis, entre ells els POUP d’Andorra la Vella i Sant Julià de Lòria. Són projectes de llarga durada, articulats mitjançant tallers temàtics successius, en què els mapes i els recorreguts permeten incorporar el coneixement quotidià de la ciutadania a la planificació.',
          ],
        },
        ecosystemic: {
          title: 'Escala ecosistèmica',
          caption: 'Biodiversitat i espais verds · Biowater',
          alt: 'Taller intergeneracional sobre espais verds',
          link: 'Veure el projecte Biowater',
          paragraphs: [
            'Juntament amb ISGlobal i el col·lectiu Replantegem, desenvolupem un procés participatiu per conèixer com imagina la ciutadania els futurs espais verds de Barcelona. Mitjançant sessions amb col·lectives d’edats i contextos diversos, recollim diferents experiències i necessitats per plantejar espais verds més inclusius, saludables i adaptats a les persones que els utilitzen.',
          ],
        },
      },
      research: {
        title: 'Investigació',
        project: {
          title: 'Cuerpas',
          caption: 'CUERPAS · Colòmbia 2023',
          videoLabel: 'Fragment audiovisual del projecte CUERPAS',
          link: 'Veure CUERPAS a Instagram',
          paragraphs: [
            'Vam fer treball de camp a Bogotà, Medellín, Cali i el Chocó, compartint espais, recorreguts i converses amb col·lectives de dones escriptores, poetes, dissenyadores i muralistes. Juntes vam explorar com les seves cuerpas habiten l’espai públic: les maneres d’ocupar-lo, recórrer-lo, narrar-lo i transformar-lo; les tensions entre seguretat i autonomia; i les empremtes que cada experiència deixa a la ciutat. CUERPAS reuneix aquestes veus per construir un nou relat urbà.',
          ],
        },
      },
      apps: {
        title: 'Apps socials',
        project: {
          title: 'Xibarri',
          caption: 'xibarri · App ciutadana',
          alt: 'Quatre pantalles de xibarri: incidència, mapa, rànquing i perfil',
          link: 'Descobrir xibarri',
          paragraphs: [
            'Xibarri és una eina digital que permet localitzar incidències al mapa, comunicar-les fàcilment a l’entitat corresponent i compartir-les amb veïnes i veïns. També permet publicar propostes i conèixer com percep la ciutadania els espais que habita, fent visibles les seves necessitats, preocupacions i idees de millora.',
          ],
        },
      },
    },
    about: {
      title: 'Urbanista feminista',
      photoAlt: 'Laura Mayer, arquitecta i urbanista',
      paragraphs: [
        'Purple Street neix d’una pregunta: per a qui estan pensades les nostres ciutats? Mentre treballava en un estudi d’urbanisme i cursava un màster en urbanisme, la lectura de Jane Jacobs em va ajudar a reconèixer que l’espai urbà no havia estat dissenyat des de les experiències i necessitats de les dones.',
        'Vaig començar aleshores a investigar i a construir el meu propi atles de referents: urbanistes i geògrafes que havien observat i explicat la ciutat des d’altres mirades. Aquest recorregut em va portar a estudiar el Màster en Estudis de Gènere de la Universitat de Barcelona i a incorporar una mirada de gènere interseccional a la meva pràctica.',
        'He viscut i treballat entre Alemanya, Suïssa i Barcelona, desenvolupant tallers, marxes urbanes i processos participatius amb universitats, administracions i col·lectives. Entenc la ciutat com una construcció compartida: un espai que podem fer més segur, més divertit, més cuidador i més sostenible per a les persones que l’habiten avui i per a les generacions futures.',
      ],
      manifestoLink: 'Llegir el manifest',
    },
    contact: 'Contacte',
  },
  manifesto: {
    pageTitle: 'Manifest',
    description: 'Els principis de Purple Street per a una ciutat accessible, cuidadora, segura i representativa.',
    back: 'Tornar a Purple Street',
    streetLabel: 'Una purple street',
    streetAlt: 'Il·lustració d’un carrer amb vegetació, joc, cures i espais col·lectius',
    intro: 'Quan ens posem les «ulleres liles», activem una mirada de gènere interseccional sobre els espais: observem si responen a les necessitats de les persones que els utilitzen, si són inclusius, respecten ritmes diferents, faciliten les cures i reconeixen la diversitat. Aquests indicadors ens ajuden a llegir-los, qüestionar-los i transformar-los.',
    principles: [
      {
        title: 'Accessibilitat',
        text: 'Totes les persones poden orientar-se i circular amb autonomia, independentment de la seva mobilitat, edat o diversitat funcional. L’espai indica on ets, cap a on vas i com arribar-hi.',
      },
      {
        title: 'Seguretat informal',
        text: 'La seguretat apareix quan hi ha ulls al carrer: plantes baixes actives, usos diversos, bona il·luminació, recorreguts visibles i absència de racons foscos.',
      },
      {
        title: 'Cures',
        text: 'El carrer permet cuidar, acompanyar i descansar. Hi ha bancs, ombra, lavabos públics accessibles i espais còmodes per a la infància i per a qui cuida.',
      },
      {
        title: 'Confort',
        text: 'Vegetació, aigua potable, ombra i materials permeables ajuden a estar millor, drenar pluges fortes i evitar superfícies que cremen. El confort és salut urbana.',
      },
      {
        title: 'Memòria i representació',
        text: 'Murals, història quotidiana, art local i llocs de trobada sense consum fan lloc a dones, col·lectives dissidents i altres vides històricament invisibilitzades.',
      },
      {
        title: 'Participació',
        text: 'La ciutat es construeix amb qui l’habita. Les solucions s’han de situar en un territori concret i respondre a les necessitats d’una població concreta.',
      },
    ],
  },
}

const en: typeof es = {
  nav: {
    whatWeDo: 'What we do',
    about: 'About',
    contact: 'Contact',
    menu: 'Menu',
    mainLabel: 'Main navigation',
    homeLabel: 'Purple Street — home',
    instagramLabel: 'Purple Street on Instagram',
    languageLabel: 'Language',
  },
  home: {
    hero: {
      line1: 'Architecture and urbanism studio',
      line2: 'with an intersectional gender perspective.',
    },
    workedWith: 'We have worked with',
    services: {
      title: 'What we do',
      story: [
        'Purple Street began as a public outreach project about public space from an intersectional gender perspective. Through content and urban walks with people connected to each place, a community grew around the desire to observe and transform the city differently.',
        'Today we combine participatory processes with collectives and public administrations, workshops for universities, professionals, teenagers and children —a stage of life that particularly interests us because it allows us to look at our surroundings without so many learned layers— and the development of social digital tools. In parallel, we research how women’s bodies inhabit and are conditioned by urban space.',
      ],
      externalLabel: 'View Instagram',
      internalLabel: 'View projects',
      items: {
        outreach: {
          title: 'Outreach',
          text: 'We bring urbanism and gender perspectives closer to diverse audiences and contexts.',
        },
        workshops: {
          title: 'Workshops',
          text: 'We design learning experiences for universities, secondary schools and children.',
        },
        participation: {
          title: 'Citizen participation',
          text: 'We facilitate civic processes that turn everyday experiences into proposals.',
        },
        walks: {
          title: 'Urban walks',
          text: 'We read the city by walking, sharing memories, care practices and needs.',
        },
        research: {
          title: 'Research',
          text: 'We explore relationships between bodies, public space, memory and representation.',
        },
        apps: {
          title: 'Social apps',
          text: 'We create digital tools that make it easier to participate, share and care for the commons.',
        },
      },
    },
    chapters: {
      workshops: {
        title: 'Workshops',
        university: {
          title: 'Urbanism & Gender Equality Workshop',
          caption: 'Universities of Geneva, Lausanne, Fribourg and Zurich · Since 2022',
          mediaLabel: 'University workshops',
          paragraphs: [
            'Since 2022, in collaboration with the Equal Saree cooperative, we have facilitated gender-sensitive urbanism workshops at the universities of Geneva, Lausanne, Fribourg and Zurich. We combine feminist urbanism theory with tools for observation and individual and collective reflection. Drawing on everyday experiences, students share diverse perspectives, analyse the spaces they inhabit and develop proposals to transform them.',
          ],
        },
        mapping: {
          title: 'Participatory mapping with children',
          caption: 'Millorem el barri · Barcelona 2026',
          link: 'View official programme',
          paragraphs: [
            'As part of Barcelona’s «World Capital of Architecture» festival, we developed participatory workshops for children. The activity centres on collaborative mapping: using a large-scale map, participants describe their everyday routes and record the strengths and weaknesses of their surroundings based on their own experience. The result is a collection of proposals that values children’s perspectives, strengthens their connection to their surroundings and encourages a critical reading of the built environment.',
          ],
        },
        fanzines: {
          title: 'Feminist fanzines',
          caption: 'Feminist fanzines · Berlin 2025',
          mediaLabel: 'Feminist fanzines',
          paragraphs: [
            'A creative expression workshop for girls, boys and teenagers aged 7 to 16, held to mark International Working Women’s Day. Through drawing, painting and collage, participants discover feminist role models, build their own narratives and turn them into individual or collective handmade publications that are later exhibited.',
          ],
        },
        accessibility: {
          title: 'Arquitectura a les Aules',
          caption: 'INS Cavall Bernat · Terrassa 2025',
          mediaLabel: 'Architecture in the classroom: accessibility',
          link: 'View the Arquiescola project',
          paragraphs: [
            'As part of Arquiescola, a programme that brings architecture closer to schools, this edition focused on architectural barriers. Through different routes around their school, students analysed the accessibility of its spaces and collectively developed proposals to improve them.',
          ],
        },
      },
      walks: {
        title: 'Urban walks',
        barcelona: {
          city: 'Barcelona',
          caption: 'Jane’s Walk · Barcelona 2026',
          link: 'View official programme',
          paragraphs: [
            'As part of the «World Capital of Architecture» festival, Jane’s Walks have been organised across Barcelona’s ten districts.',
            'Each route encourages conversation and shared exploration of the surroundings. Everyday life —public space, care, local commerce and memory— takes centre stage, while a plurality of perspectives helps build a collective urban narrative.',
          ],
        },
        manresa: {
          city: 'Manresa',
          caption: 'Jane’s Walk · Manresa 2025',
          mediaLabel: 'Jane’s Walk Manresa',
          paragraphs: [
            'In 2025 we held a Jane’s Walk in Manresa. We had the opportunity to walk alongside the person who had served as the city’s municipal urban planner for many years and discuss its urban transformations, its memory and the challenges that remain open.',
          ],
        },
        sion: {
          city: 'Sion',
          caption: 'Jane’s Walk · Sion 2021–2023',
          link: 'Discover Jane’s Walk',
          paragraphs: [
            'Jane’s Walk is a citizen-led movement of free walking conversations inspired by Jane Jacobs. In 2021, 2022 and 2023 we organised several editions in Sion, Switzerland. Each route was developed with local shops, art centres, craftspeople and makers, valuing their knowledge and everyday relationship with the area. These collaborations made it possible to share experiences, identify needs and build a collective reading of the city.',
          ],
        },
      },
      participation: {
        title: 'Citizen participation',
        municipal: {
          title: 'Municipal scale',
          caption: 'Transforming public spaces',
          alt: 'Open session about everyday spaces',
          paragraphs: [
            'In collaboration with different studios, we develop participatory processes to transform everyday public spaces such as streets, squares and parks. We design and facilitate diagnosis, proposal and feedback sessions, incorporating residents’ experiences and priorities at every stage of the project.',
          ],
        },
        territorial: {
          title: 'Territorial scale',
          caption: 'Urban and territorial planning',
          alt: 'Territorial map developed collectively',
          paragraphs: [
            'In collaboration with studios such as Territoris XLM and Equal Saree, we develop participatory processes linked to urban and territorial planning in several municipalities, including the POUP plans for Andorra la Vella and Sant Julià de Lòria. These are long-term projects structured through a sequence of thematic workshops, in which maps and routes bring residents’ everyday knowledge into the planning process.',
          ],
        },
        ecosystemic: {
          title: 'Ecosystem scale',
          caption: 'Biodiversity and green spaces · Biowater',
          alt: 'Intergenerational workshop about green spaces',
          link: 'View the Biowater project',
          paragraphs: [
            'Together with ISGlobal and the Replantegem collective, we developed a participatory process to understand how residents imagine Barcelona’s future green spaces. Through sessions with collectives of different ages and backgrounds, we gathered diverse experiences and needs to envision greener spaces that are more inclusive, healthy and responsive to the people who use them.',
          ],
        },
      },
      research: {
        title: 'Research',
        project: {
          title: 'Cuerpas',
          caption: 'CUERPAS · Colombia 2023',
          videoLabel: 'Excerpt from the CUERPAS audiovisual project',
          link: 'View CUERPAS on Instagram',
          paragraphs: [
            'We carried out fieldwork in Bogotá, Medellín, Cali and Chocó, sharing spaces, routes and conversations with collectives of women writers, poets, designers and muralists. Together, we explored how their cuerpas inhabit public space: the ways they occupy, move through, narrate and transform it; the tensions between safety and autonomy; and the traces each experience leaves on the city. CUERPAS brings these voices together to build a new urban narrative.',
          ],
        },
      },
      apps: {
        title: 'Social apps',
        project: {
          title: 'Xibarri',
          caption: 'xibarri · Citizen app',
          alt: 'Four xibarri screens: report, map, ranking and profile',
          link: 'Discover xibarri',
          paragraphs: [
            'Xibarri is a digital tool that lets people locate issues on a map, easily report them to the appropriate authority and share them with neighbours. It also allows residents to publish proposals and understand how people perceive the spaces they inhabit, making their needs, concerns and ideas for improvement visible.',
          ],
        },
      },
    },
    about: {
      title: 'Feminist urban planner',
      photoAlt: 'Laura Mayer, architect and urban planner',
      paragraphs: [
        'Purple Street began with a question: who are our cities designed for? While working at an urban planning studio and studying for a master’s degree in urbanism, reading Jane Jacobs helped me recognise that urban space had not been designed around women’s experiences and needs.',
        'I began researching and building my own atlas of references: women urban planners and geographers who had observed and explained the city through different perspectives. That journey led me to the Master’s in Gender Studies at the University of Barcelona and to bring an intersectional gender perspective into my practice.',
        'I have lived and worked across Germany, Switzerland and Barcelona, developing workshops, urban walks and participatory processes with universities, public administrations and collectives. I understand the city as a shared construction: a space we can make safer, more playful, more caring and more sustainable for those who live in it today and for future generations.',
      ],
      manifestoLink: 'Read the manifesto',
    },
    contact: 'Contact',
  },
  manifesto: {
    pageTitle: 'Manifesto',
    description: 'Purple Street’s principles for an accessible, caring, safe and representative city.',
    back: 'Back to Purple Street',
    streetLabel: 'A purple street',
    streetAlt: 'Illustration of a street with greenery, play, care and shared spaces',
    intro: 'When we put on our «purple glasses», we activate an intersectional gender perspective on space: we ask whether places respond to the needs of the people who use them, whether they are inclusive, respect different rhythms, enable care and recognise diversity. These indicators help us read, question and transform them.',
    principles: [
      {
        title: 'Accessibility',
        text: 'Everyone can orient themselves and move around independently, regardless of mobility, age or disability. The space makes it clear where you are, where you are going and how to get there.',
      },
      {
        title: 'Informal safety',
        text: 'Safety emerges when there are eyes on the street: active ground floors, diverse uses, good lighting, visible routes and no dark or hidden corners.',
      },
      {
        title: 'Care',
        text: 'The street makes room for caring, accompanying and resting. There are benches, shade, accessible public toilets and comfortable spaces for children and caregivers.',
      },
      {
        title: 'Comfort',
        text: 'Vegetation, drinking water, shade and permeable materials improve summer comfort, drain heavy rainfall and prevent surfaces from overheating. Comfort is urban health.',
      },
      {
        title: 'Memory and representation',
        text: 'Murals, everyday history, local art and places to meet without spending money make room for women, dissident collectives and other lives that have historically been made invisible.',
      },
      {
        title: 'Participation',
        text: 'The city is built with the people who inhabit it. Solutions must be rooted in a specific territory and respond to the needs of a specific population.',
      },
    ],
  },
}

const fr: typeof es = {
  nav: {
    whatWeDo: 'Ce que nous faisons',
    about: 'À propos',
    contact: 'Contact',
    menu: 'Menu',
    mainLabel: 'Navigation principale',
    homeLabel: 'Purple Street — accueil',
    instagramLabel: 'Purple Street sur Instagram',
    languageLabel: 'Langue',
  },
  home: {
    hero: {
      line1: 'Studio d’architecture et d’urbanisme',
      line2: 'avec une approche de genre intersectionnelle.',
    },
    workedWith: 'Nous avons travaillé avec',
    services: {
      title: 'Ce que nous faisons',
      story: [
        'Purple Street est né comme un projet de sensibilisation à l’espace public à travers une approche de genre intersectionnelle. Grâce à des contenus et à des marches urbaines avec des personnes liées à chaque territoire, une communauté désireuse d’observer et de transformer la ville autrement s’est développée.',
        'Aujourd’hui, nous combinons des démarches participatives avec des collectifs et des administrations, des ateliers pour les universités, les professionnel·les, les adolescent·es et les enfants —un âge qui nous intéresse particulièrement car il permet d’observer l’environnement sans autant de couches apprises— ainsi que le développement d’outils numériques sociaux. En parallèle, nous étudions la manière dont les corps des femmes habitent l’espace urbain et sont conditionnés par celui-ci.',
      ],
      externalLabel: 'Voir Instagram',
      internalLabel: 'Voir les projets',
      items: {
        outreach: {
          title: 'Sensibilisation',
          text: 'Nous rendons l’urbanisme et l’approche de genre accessibles à des publics et contextes variés.',
        },
        workshops: {
          title: 'Ateliers',
          text: 'Nous concevons des expériences d’apprentissage pour les universités, les écoles et les enfants.',
        },
        participation: {
          title: 'Participation citoyenne',
          text: 'Nous facilitons des démarches citoyennes qui transforment les expériences quotidiennes en propositions.',
        },
        walks: {
          title: 'Marches urbaines',
          text: 'Nous lisons la ville en marchant et en partageant mémoires, pratiques de soin et besoins.',
        },
        research: {
          title: 'Recherche',
          text: 'Nous explorons les relations entre les corps, l’espace public, la mémoire et la représentation.',
        },
        apps: {
          title: 'Applications sociales',
          text: 'Nous créons des outils numériques qui facilitent la participation, le partage et le soin des communs.',
        },
      },
    },
    chapters: {
      workshops: {
        title: 'Ateliers',
        university: {
          title: 'Urbanism & Gender Equality Workshop',
          caption: 'Universités de Genève, Lausanne, Fribourg et Zurich · Depuis 2022',
          mediaLabel: 'Ateliers universitaires',
          paragraphs: [
            'Depuis 2022, en collaboration avec la coopérative Equal Saree, nous animons des ateliers d’urbanisme intégrant une approche de genre dans les universités de Genève, Lausanne, Fribourg et Zurich. Nous associons la théorie de l’urbanisme féministe à des outils d’observation et de réflexion individuelle et collective. À partir d’expériences quotidiennes, les étudiant·es partagent des perspectives diverses, analysent les espaces qu’ils et elles habitent et formulent des propositions pour les transformer.',
          ],
        },
        mapping: {
          title: 'Cartographie participative avec les enfants',
          caption: 'Millorem el barri · Barcelone 2026',
          link: 'Voir le programme officiel',
          paragraphs: [
            'Dans le cadre du festival «Capitale mondiale de l’architecture» à Barcelone, nous avons conçu des ateliers participatifs destinés aux enfants. L’activité repose sur la cartographie collaborative: à partir d’un grand plan, les participant·es décrivent leurs trajets quotidiens et identifient les points forts et faibles de leur environnement selon leur propre expérience. Le résultat est un ensemble de propositions qui valorise le regard des enfants, renforce leur lien avec leur environnement et encourage une lecture critique de l’espace construit.',
          ],
        },
        fanzines: {
          title: 'Fanzines féministes',
          caption: 'Fanzines féministes · Berlin 2025',
          mediaLabel: 'Fanzines féministes',
          paragraphs: [
            'Atelier d’expression créative mené avec des filles, des garçons et des adolescent·es de 7 à 16 ans à l’occasion de la Journée internationale des droits des femmes. Par le dessin, la peinture et le collage, les participant·es découvrent des références féministes, construisent leurs propres récits et les transforment en publications artisanales individuelles ou collectives, ensuite exposées.',
          ],
        },
        accessibility: {
          title: 'Arquitectura a les Aules',
          caption: 'INS Cavall Bernat · Terrassa 2025',
          mediaLabel: 'L’architecture en classe: accessibilité',
          link: 'Voir le projet Arquiescola',
          paragraphs: [
            'Dans le cadre d’Arquiescola, un programme qui rapproche l’architecture des écoles et des collèges, cette édition a abordé les barrières architecturales. À travers différents parcours dans leur établissement, les élèves ont analysé l’accessibilité des espaces et élaboré collectivement des propositions pour les améliorer.',
          ],
        },
      },
      walks: {
        title: 'Marches urbaines',
        barcelona: {
          city: 'Barcelone',
          caption: 'Jane’s Walk · Barcelone 2026',
          link: 'Voir le programme officiel',
          paragraphs: [
            'Dans le cadre du festival «Capitale mondiale de l’architecture», des Jane’s Walks ont été organisées dans les dix districts de Barcelone.',
            'Chaque itinéraire encourage la conversation et l’exploration partagée de l’environnement. La vie quotidienne —l’espace public, le soin, le commerce local et la mémoire— est placée au centre, tandis que la pluralité des regards contribue à construire un récit collectif.',
          ],
        },
        manresa: {
          city: 'Manresa',
          caption: 'Jane’s Walk · Manresa 2025',
          mediaLabel: 'Jane’s Walk Manresa',
          paragraphs: [
            'En 2025, nous avons organisé une Jane’s Walk à Manresa. Nous avons eu la chance de marcher avec la personne qui avait été urbaniste municipal de la ville pendant de nombreuses années et d’échanger sur ses transformations urbaines, sa mémoire et les défis qui restent encore ouverts.',
          ],
        },
        sion: {
          city: 'Sion',
          caption: 'Jane’s Walk · Sion 2021–2023',
          link: 'Découvrir Jane’s Walk',
          paragraphs: [
            'Jane’s Walk est un mouvement citoyen de promenades-discussions gratuites inspiré par Jane Jacobs. En 2021, 2022 et 2023, nous avons organisé plusieurs éditions à Sion, en Suisse. Chaque parcours a été construit avec des commerces locaux, des centres d’art, des artisanes et des artisans, en valorisant leurs connaissances et leur relation quotidienne au territoire. Ces collaborations ont permis de partager des expériences, d’identifier des besoins et de construire une lecture collective de la ville.',
          ],
        },
      },
      participation: {
        title: 'Participation citoyenne',
        municipal: {
          title: 'Échelle municipale',
          caption: 'Transformation des espaces publics',
          alt: 'Session ouverte sur les espaces du quotidien',
          paragraphs: [
            'En collaboration avec différents studios, nous développons des démarches participatives pour transformer les espaces publics du quotidien, tels que les rues, les places et les parcs. Nous concevons et animons des séances de diagnostic, de formulation de propositions et de restitution, en intégrant les expériences et les priorités des habitant·es à chaque étape du projet.',
          ],
        },
        territorial: {
          title: 'Échelle territoriale',
          caption: 'Planification urbaine et territoriale',
          alt: 'Carte territoriale élaborée collectivement',
          paragraphs: [
            'En collaboration avec des studios tels que Territoris XLM et Equal Saree, nous développons des démarches participatives liées à la planification urbaine et territoriale dans plusieurs communes, notamment les POUP d’Andorra la Vella et de Sant Julià de Lòria. Ces projets de longue durée sont structurés en une succession d’ateliers thématiques, où cartes et parcours permettent d’intégrer les savoirs quotidiens des habitant·es à la planification.',
          ],
        },
        ecosystemic: {
          title: 'Échelle écosystémique',
          caption: 'Biodiversité et espaces verts · Biowater',
          alt: 'Atelier intergénérationnel sur les espaces verts',
          link: 'Voir le projet Biowater',
          paragraphs: [
            'Avec ISGlobal et le collectif Replantegem, nous avons développé une démarche participative pour comprendre comment les habitant·es imaginent les futurs espaces verts de Barcelone. Grâce à des sessions réunissant des collectifs d’âges et de contextes variés, nous recueillons différentes expériences et différents besoins afin d’imaginer des espaces verts plus inclusifs, plus sains et mieux adaptés aux personnes qui les utilisent.',
          ],
        },
      },
      research: {
        title: 'Recherche',
        project: {
          title: 'Cuerpas',
          caption: 'CUERPAS · Colombie 2023',
          videoLabel: 'Extrait audiovisuel du projet CUERPAS',
          link: 'Voir CUERPAS sur Instagram',
          paragraphs: [
            'Nous avons mené un travail de terrain à Bogotá, Medellín, Cali et dans le Chocó, en partageant des espaces, des parcours et des conversations avec des collectifs de femmes écrivaines, poètes, designers et muralistes. Ensemble, nous avons exploré la manière dont leurs cuerpas habitent l’espace public: les façons de l’occuper, de le parcourir, de le raconter et de le transformer; les tensions entre sécurité et autonomie; et les traces que chaque expérience laisse dans la ville. CUERPAS réunit ces voix pour construire un nouveau récit urbain.',
          ],
        },
      },
      apps: {
        title: 'Applications sociales',
        project: {
          title: 'Xibarri',
          caption: 'xibarri · Application citoyenne',
          alt: 'Quatre écrans de xibarri: signalement, carte, classement et profil',
          link: 'Découvrir xibarri',
          paragraphs: [
            'Xibarri est un outil numérique qui permet de localiser des problèmes sur une carte, de les signaler facilement à l’autorité compétente et de les partager avec le voisinage. Il permet également de publier des propositions et de comprendre comment les habitant·es perçoivent les espaces qu’ils et elles fréquentent, en rendant visibles leurs besoins, leurs préoccupations et leurs idées d’amélioration.',
          ],
        },
      },
    },
    about: {
      title: 'Urbaniste féministe',
      photoAlt: 'Laura Mayer, architecte et urbaniste',
      paragraphs: [
        'Purple Street est né d’une question: pour qui nos villes sont-elles conçues? Alors que je travaillais dans une agence d’urbanisme et suivais un master en urbanisme, la lecture de Jane Jacobs m’a aidée à comprendre que l’espace urbain n’avait pas été pensé à partir des expériences et des besoins des femmes.',
        'J’ai alors commencé à enquêter et à construire mon propre atlas de références: des urbanistes et des géographes qui avaient observé et expliqué la ville à travers d’autres regards. Ce parcours m’a conduite au Master en Études de genre de l’Université de Barcelone et à intégrer une approche de genre intersectionnelle à ma pratique.',
        'J’ai vécu et travaillé entre l’Allemagne, la Suisse et Barcelone, en développant des ateliers, des marches urbaines et des démarches participatives avec des universités, des administrations et des collectifs. Je conçois la ville comme une construction partagée: un espace que nous pouvons rendre plus sûr, plus ludique, plus accueillant et plus durable pour les personnes qui l’habitent aujourd’hui et pour les générations futures.',
      ],
      manifestoLink: 'Lire le manifeste',
    },
    contact: 'Contact',
  },
  manifesto: {
    pageTitle: 'Manifeste',
    description: 'Les principes de Purple Street pour une ville accessible, accueillante, sûre et représentative.',
    back: 'Retour à Purple Street',
    streetLabel: 'Une purple street',
    streetAlt: 'Illustration d’une rue avec végétation, jeux, espaces de soin et lieux partagés',
    intro: 'Lorsque nous mettons nos «lunettes violettes», nous activons une approche de genre intersectionnelle sur les espaces: nous observons s’ils répondent aux besoins des personnes qui les utilisent, s’ils sont inclusifs, respectent différents rythmes, facilitent le soin et reconnaissent la diversité. Ces indicateurs nous aident à les lire, à les questionner et à les transformer.',
    principles: [
      {
        title: 'Accessibilité',
        text: 'Chaque personne peut s’orienter et se déplacer de manière autonome, quels que soient sa mobilité, son âge ou son handicap. L’espace indique où l’on se trouve, où l’on va et comment y parvenir.',
      },
      {
        title: 'Sécurité informelle',
        text: 'La sécurité apparaît lorsqu’il y a des yeux dans la rue: des rez-de-chaussée actifs, des usages variés, un bon éclairage, des parcours visibles et aucun recoin sombre.',
      },
      {
        title: 'Soin',
        text: 'La rue permet de prendre soin, d’accompagner et de se reposer. Elle offre des bancs, de l’ombre, des toilettes publiques accessibles et des espaces confortables pour les enfants comme pour les personnes qui prennent soin des autres.',
      },
      {
        title: 'Confort',
        text: 'La végétation, l’eau potable, l’ombre et les matériaux perméables améliorent le confort en été, absorbent les fortes pluies et évitent les surfaces brûlantes. Le confort est une question de santé urbaine.',
      },
      {
        title: 'Mémoire et représentation',
        text: 'Les fresques, l’histoire quotidienne, l’art local et les lieux de rencontre sans obligation de consommer font une place aux femmes, aux collectifs dissidents et à d’autres vies historiquement invisibilisées.',
      },
      {
        title: 'Participation',
        text: 'La ville se construit avec celles et ceux qui l’habitent. Les solutions doivent s’ancrer dans un territoire précis et répondre aux besoins d’une population concrète.',
      },
    ],
  },
}

export const translations = { es, ca, en, fr }

export type Translation = typeof es
