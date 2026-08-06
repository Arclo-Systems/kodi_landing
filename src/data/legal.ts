// ESPEJO de `frontend/src/lib/legal/{privacy,terms,raffle-rules}.ts`.
// La app y estas páginas web deben decir EXACTAMENTE lo mismo: la landing no
// puede importar del repo del frontend, así que el contenido se duplica aquí
// con la misma forma para que un diff sea literal.
//
// AL EDITAR CUALQUIERA DE LOS DOS LADOS, SINCRONIZAR EL OTRO.
//
// PENDIENTE revisión legal formal del founder.

export interface LegalSection {
  title: string;
  body: string;
}

export interface LegalDocument {
  version: string;
  lastUpdated: string;
  title: string;
  sections: LegalSection[];
}

export const PRIVACY_DOC: LegalDocument = {
  version: '2026-08-05.2',
  lastUpdated: '5 de agosto, 2026',
  title: 'Política de privacidad',
  sections: [
    {
      title: '1. Información que recopilamos',
      body: 'Recopilamos los datos que nos das al crear tu cuenta (nombre, correo, teléfono, país y módulos elegidos), tu progreso de aprendizaje, métricas de uso de la app y datos técnicos del dispositivo (modelo, sistema operativo, identificadores de instalación y el identificador de publicidad del dispositivo). Cuando algo se rompe en la app también recibimos un reporte automático del error con el estado del dispositivo en ese momento.',
    },
    {
      title: '2. Cómo usamos tu información',
      body: 'Usamos tus datos para ofrecerte la experiencia personalizada de Kodi: adaptar el contenido a tu módulo y país, calcular ranking y ligas, enviar notificaciones de tu racha y misiones, validar suscripciones, mostrar y medir anuncios, y mejorar el servicio. No vendemos tus datos personales.',
    },
    {
      title: '3. Compartir con terceros',
      body: 'Compartimos datos solo con los proveedores que nos ayudan a operar la app: Google AdMob (anuncios), Sentry (reportes de errores y fallos), Cloudflare R2 (almacenamiento de archivos e imágenes), Brevo (correos), Firebase Cloud Messaging de Google (notificaciones push) y Railway (hosting de la API y la base de datos). Las compras las procesan directamente App Store (Apple) y Google Play (Google): nunca vemos ni guardamos los datos de tu tarjeta. Estos proveedores operan servidores fuera de Costa Rica, así que tu información puede procesarse en otros países bajo compromisos contractuales de protección. Todos están obligados a usarla solo para el servicio acordado.',
    },
    {
      title: '4. Menores de edad',
      body: 'Si tenés menos de 13 años, necesitás la autorización de tu madre, padre o tutor legal para usar Kodi: le enviamos un correo y guardamos el registro de su aprobación con la fecha, la versión del aviso aceptada y los datos técnicos de esa aprobación. Sin ese permiso la cuenta queda pendiente y no se puede usar.',
    },
    {
      title: '5. Publicidad, cookies y tecnologías similares',
      body: 'La app muestra anuncios de Google AdMob: videos con recompensa que elegís ver y un anuncio ocasional al cerrar una sesión en el plan gratuito. Google puede usar el identificador de publicidad de tu dispositivo para mostrar y medir esos anuncios y, según tu configuración, personalizarlos. Si sos menor de edad le pedimos a Google anuncios NO personalizados y aptos para tu edad. En iOS, Apple exige tu permiso explícito (el cuadro de diálogo de rastreo, ATT) para usar ese identificador con fines publicitarios: mientras no lo autorices seguís viendo anuncios, pero no personalizados. Podés cambiar esta preferencia cuando quieras desde los ajustes de tu teléfono (iOS: Privacidad y seguridad → Rastreo; Android: Google → Anuncios). Fuera de la publicidad usamos identificadores de dispositivo y almacenamiento local solo para mantener tu sesión, guardar preferencias y medir uso de la app.',
    },
    {
      title: '6. Seguridad',
      body: 'Aplicamos medidas técnicas y organizativas razonables para proteger tu información (cifrado en tránsito, almacenamiento seguro de credenciales, controles de acceso). Ningún sistema es 100 % seguro — si detectás algo sospechoso, escribinos a soporte@holakodi.com.',
    },
    {
      title: '7. Tus derechos',
      body: 'Podés acceder a tus datos personales y corregirlos en cualquier momento desde Perfil → Editar perfil, y eliminar tu cuenta desde Configuración → Cuenta → Eliminar cuenta. También podés pedir una copia exportable de tus datos desde Configuración → Cuenta → Descargar mis datos, o escribiendo a soporte@holakodi.com. El tratamiento de tus datos se rige por la Ley 8968 de Costa Rica. Si considerás que no atendimos tu solicitud, podés presentar una denuncia ante la Agencia de Protección de Datos de los Habitantes (PRODHAB).',
    },
    {
      title: '8. Retención de datos',
      body: 'Conservamos tus datos mientras tu cuenta esté activa. Cuando eliminás tu cuenta, los datos personales se borran dentro de 30 días, salvo aquellos que debemos retener por obligación legal o fiscal.',
    },
    {
      title: '9. Cambios a esta política',
      body: 'Podemos actualizar esta Política de privacidad cuando cambien nuestras prácticas o la regulación aplicable. Si hay cambios materiales, te avisaremos en la app antes de que entren en vigor.',
    },
    {
      title: '10. Contacto',
      body: 'Kodi es un producto de 3-102-957909 Sociedad de Responsabilidad Limitada, que opera bajo la marca Arclo Systems, cédula jurídica 3-102-957909, con domicilio en Tilarán, Guanacaste, Costa Rica (300 metros norte del Banco Nacional de Costa Rica, casa color blanco esquinera). Teléfono: (+506) 8316-5810. Para consultas sobre privacidad o para ejercer tus derechos, escribinos a soporte@holakodi.com.',
    },
  ],
};

export const TERMS_DOC: LegalDocument = {
  version: '2026-08-05.2',
  lastUpdated: '5 de agosto, 2026',
  title: 'Términos de uso',
  sections: [
    {
      title: '1. Aceptación de los términos',
      body: 'Al crear una cuenta o usar Kodi, aceptás estos Términos de uso y nuestra Política de privacidad. Si no estás de acuerdo, no uses la aplicación.',
    },
    {
      title: '2. Descripción del servicio',
      body: 'Kodi es una plataforma educativa móvil para la preparación de exámenes académicos y de certificación. Incluye contenido de práctica, simulacros, modos competitivos y un sistema de logros. La disponibilidad de módulos y países puede variar. El servicio se financia con suscripciones y con anuncios en el plan gratuito.',
    },
    {
      title: '3. Cuenta de usuario',
      body: 'Sos responsable de mantener la confidencialidad de tu cuenta y contraseña, y de toda actividad que ocurra bajo tu cuenta. Si tenés menos de 13 años, necesitás la autorización de tu madre, padre o tutor legal para crear una cuenta: la verificamos por correo antes de activarla.',
    },
    {
      title: '4. Conducta del usuario',
      body: 'No podés usar Kodi para actividades ilegales, suplantar a otra persona, hacer ingeniería inversa de la app, abusar de los sistemas de competición (multi-cuentas, bots) ni distribuir contenido protegido por derechos de autor sin autorización.',
    },
    {
      title: '5. Suscripciones y pagos',
      body: 'Las suscripciones de pago de Kodi (Kodi Premium) se cobran a través de App Store o Google Play, y se renuevan automáticamente salvo que las canceles desde la tienda antes del fin del período. Si activás una prueba gratuita, al terminar se convierte en suscripción de pago salvo que la canceles antes desde la tienda. La gestión de cobros, cancelaciones y reembolsos la maneja la tienda donde compraste. Los pagos no son reembolsables salvo que la ley local lo exija.',
    },
    {
      title: '6. Propiedad intelectual',
      body: 'Todo el contenido (preguntas, módulos, mascota, ilustraciones, marca, código) es propiedad de Kodi o de sus licenciantes. No podés copiarlo, redistribuirlo ni crear obras derivadas sin permiso escrito.',
    },
    {
      title: '7. Limitación de responsabilidad',
      body: 'Kodi se ofrece "tal cual". No garantizamos que el contenido sea exhaustivo o esté libre de errores. No nos hacemos responsables del resultado de exámenes reales basados en el uso de la app. El uso es bajo tu propio riesgo.',
    },
    {
      title: '8. Modificaciones',
      body: 'Podemos actualizar estos Términos en cualquier momento. Si los cambios son materiales, te avisaremos en la app. El uso continuado después de la actualización implica aceptación de los nuevos términos.',
    },
    {
      title: '9. Ley aplicable',
      body: 'Estos Términos se rigen por las leyes de Costa Rica. Cualquier disputa se resolverá en los tribunales competentes de San José, Costa Rica.',
    },
    {
      title: '10. Contacto',
      body: 'Kodi es un producto de 3-102-957909 Sociedad de Responsabilidad Limitada, que opera bajo la marca Arclo Systems, cédula jurídica 3-102-957909, con domicilio en Tilarán, Guanacaste, Costa Rica (300 metros norte del Banco Nacional de Costa Rica, casa color blanco esquinera). Teléfono: (+506) 8316-5810. Para consultas sobre estos Términos, escribinos a soporte@holakodi.com.',
    },
  ],
};

export const RAFFLE_RULES_DOC: LegalDocument = {
  version: '2026-08-05.2',
  lastUpdated: '5 de agosto, 2026',
  title: 'Bases de premiaciones',
  sections: [
    {
      title: '1. Naturaleza del programa',
      body: 'Las premiaciones de Kodi reconocen el mérito académico. No son un sorteo, rifa ni juego de azar: no se compra participación, no existe pago para participar ni para mejorar las probabilidades. Participar es gratuito para cualquier usuario elegible.',
    },
    {
      title: '2. Elegibilidad',
      body: 'Usuarios registrados en Kodi con cuenta activa y residencia en Costa Rica. Las personas menores de edad requieren la autorización parental vigente dentro de la app. No pueden participar colaboradores de Kodi ni del patrocinador de la premiación, ni sus familiares directos.',
    },
    {
      title: '3. Cómo se gana',
      body: 'El premio de cada período se asigna por mérito según la posición final en la liga Genio del módulo correspondiente, determinada por los puntos EXP obtenidos respondiendo correctamente dentro del período indicado en la app. Los criterios son objetivos y verificables; no interviene el azar ni ningún pago.',
    },
    {
      title: '4. Premios y entrega',
      body: 'Kodi organiza estas premiaciones y responde ante las personas participantes. El premio de cada período se describe en la pantalla de Premiaciones y lo aporta el patrocinador indicado, que se encarga de la entrega en el plazo y forma que se comunique a la persona ganadora por los datos de contacto de su cuenta. Los premios no son canjeables por dinero ni transferibles, salvo que el patrocinador indique lo contrario.',
    },
    {
      title: '5. Apple y Google',
      body: 'Apple Inc. no es patrocinador de estas premiaciones y no participa en ellas de ninguna forma. Google LLC tampoco es patrocinador ni participa de ninguna forma. Cualquier consulta o reclamo debe dirigirse a Kodi o al patrocinador indicado, nunca a Apple ni a Google.',
    },
    {
      title: '6. Conducta y descalificación',
      body: 'Kodi puede descalificar cuentas que obtengan puntos mediante trampa, automatización, cuentas múltiples o cualquier violación de los Términos de uso. La descalificación puede aplicarse antes o después de anunciar resultados.',
    },
    {
      title: '7. Datos personales',
      body: 'Los datos de la persona ganadora se usan únicamente para coordinar la entrega del premio, conforme a la Política de privacidad de Kodi. El nombre visible en la app puede mostrarse en la lista de ganadores.',
    },
    {
      title: '8. Vigencia y cambios',
      body: 'Kodi puede modificar estas bases; la versión vigente es siempre la publicada en esta pantalla. Los cambios no afectan premios ya anunciados.',
    },
    {
      title: '9. Legislación y contacto',
      body: 'Estas premiaciones las organiza 3-102-957909 Sociedad de Responsabilidad Limitada, que opera bajo la marca Arclo Systems, cédula jurídica 3-102-957909, con domicilio en Tilarán, Guanacaste, Costa Rica, teléfono (+506) 8316-5810. Estas bases se rigen por la legislación de Costa Rica. Consultas: soporte@holakodi.com.',
    },
  ],
};
