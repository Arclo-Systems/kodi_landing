// ESPEJO de `frontend/src/lib/legal/privacy.ts` y `frontend/src/lib/legal/terms.ts`.
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
  version: '2026-08-04',
  lastUpdated: '4 de agosto, 2026',
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
      body: 'Kodi es una app educativa orientada a estudiantes de bachillerato y admisión universitaria. Si sos menor de 18 años, necesitás el consentimiento de tu madre, padre o tutor legal para registrarte, y guardamos el registro de ese consentimiento. No recopilamos conscientemente datos de menores de 13 años sin verificación parental.',
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
      body: 'Podés acceder a tus datos personales y corregirlos en cualquier momento desde Perfil → Editar perfil, y eliminar tu cuenta desde Configuración → Cuenta → Eliminar cuenta. También podés solicitar una copia exportable de tus datos escribiendo a soporte@holakodi.com.',
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
      body: 'Kodi es un producto de Arclo Systems, con operación en Costa Rica. Para consultas sobre privacidad o para ejercer tus derechos, escribinos a soporte@holakodi.com.',
    },
  ],
};

export const TERMS_DOC: LegalDocument = {
  version: '2026-08-04',
  lastUpdated: '4 de agosto, 2026',
  title: 'Términos de uso',
  sections: [
    {
      title: '1. Aceptación de los términos',
      body: 'Al crear una cuenta o usar Kodi, aceptás estos Términos de uso y nuestra Política de privacidad. Si no estás de acuerdo, no uses la aplicación.',
    },
    {
      title: '2. Descripción del servicio',
      body: 'Kodi es una plataforma educativa móvil para la preparación de exámenes en Centroamérica (Costa Rica, Guatemala, El Salvador, Honduras, Panamá). Incluye contenido de práctica, simulacros, modos competitivos y un sistema de logros. El servicio se financia con suscripciones y con anuncios en el plan gratuito.',
    },
    {
      title: '3. Cuenta de usuario',
      body: 'Sos responsable de mantener la confidencialidad de tu cuenta y contraseña, y de toda actividad que ocurra bajo tu cuenta. Si sos menor de edad, necesitás el consentimiento de tu madre, padre o tutor legal para crear una cuenta.',
    },
    {
      title: '4. Conducta del usuario',
      body: 'No podés usar Kodi para actividades ilegales, suplantar a otra persona, hacer ingeniería inversa de la app, abusar de los sistemas de competición (multi-cuentas, bots) ni distribuir contenido protegido por derechos de autor sin autorización.',
    },
    {
      title: '5. Suscripciones y pagos',
      body: 'Las suscripciones a Kodi Plus se cobran a través de App Store o Google Play, y se renuevan automáticamente salvo que las canceles desde la tienda antes del fin del período. La gestión de cobros, cancelaciones y reembolsos la maneja la tienda donde compraste. Los pagos no son reembolsables salvo que la ley local lo exija.',
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
      body: 'Kodi es un producto de Arclo Systems, con operación en Costa Rica. Para consultas sobre estos Términos, escribinos a soporte@holakodi.com.',
    },
  ],
};
