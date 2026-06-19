export type MailGroup = 'today' | 'yesterday' | 'week' | 'june'

export interface MailItem {
  id: string
  sender: string
  subject: string
  preview: string
  date: string
  time?: string
  avatarColor: string
  avatarText: string
  isUnread?: boolean
  isNew?: boolean
  hasAttachment?: boolean
  isStarred?: boolean
  isImportant?: boolean
  images?: string[]
  group: MailGroup
  folderId: string
}

export type SidebarIcon =
  | 'inbox'
  | 'users'
  | 'megaphone'
  | 'landmark'
  | 'newspaper'
  | 'receipt'
  | 'graduation-cap'
  | 'gamepad-2'
  | 'user'
  | 'sticky-note'
  | 'send'
  | 'file-edit'
  | 'layout-template'
  | 'shield-alert'
  | 'trash-2'

export interface SidebarFolder {
  id: string
  label: string
  path: string
  count?: string
  icon: SidebarIcon
}

export const groupLabels: Record<MailGroup, string> = {
  today: '27 июня 2027',
  yesterday: '27 июня 2027',
  week: '27 июня 2027',
  june: '27 июня 2027',
}

export const mockMails: MailItem[] = [
  // ── Входящие: завал от клиентов и дел ──
  {
    id: '1',
    sender: 'Елена Соколова',
    subject: 'СРОЧНО: заседание перенесли на понедельник',
    preview: 'Адковат, только что позвонили из суда — заседание по делу о разделе имущества перенесли на 30 июня, 10:00. Вы сможете?',
    date: '27 июн',
    avatarColor: 'bg-rose-500',
    avatarText: 'ЕС',
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '2',
    sender: 'Игорь Ветров',
    subject: 'Re: уголовное дело № 2-1847/2027 — допрос свидетеля',
    preview: 'Добрый вечер. Прокуратура назначила допрос на среду. Прошу подготовить список вопросов и согласовать время встречи.',
    date: '27 июн',
    avatarColor: 'bg-slate-700',
    avatarText: 'ИВ',
    hasAttachment: true,
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '3',
    sender: 'Ольга Миронова',
    subject: 'Документы по наследству — прошу посмотреть сегодня',
    preview: 'Прикрепила завещание, свидетельство о смерти и выписку из ЕГРН. Нотариус ждёт ответ до конца недели.',
    date: '27 июн',
    avatarColor: 'bg-violet-600',
    avatarText: 'ОМ',
    hasAttachment: true,
    isStarred: true,
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '4',
    sender: 'Арбитражный суд г. Энска',
    subject: 'Уведомление о принятии искового заявления',
    preview: 'По делу № А40-92841/2027 «ООО «СтройКом» против ИП Кузнецова» назначено предварительное заседание.',
    date: '27 июн',
    avatarColor: 'bg-red-800',
    avatarText: 'АС',
    hasAttachment: true,
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '5',
    sender: 'Дмитрий Кузнецов',
    subject: 'Re: отзыв на иск — срок подачи',
    preview: 'Добрый день, Андрей Андреевич. Направляю дополнительные документы по контракту. Подскажите, пожалуйста, успеем подать отзыв на иск до пятницы?',
    date: '27 июн',
    avatarColor: 'bg-orange-600',
    avatarText: 'ДК',
    hasAttachment: true,
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '6',
    sender: 'Марина Петрова',
    subject: 'Re: алименты — ответ на ходатайство',
    preview: 'Ответчик подал встречный иск. Отправляю копию. Нужна ваша оценка, стоит ли оспаривать.',
    date: '27 июн',
    avatarColor: 'bg-teal-600',
    avatarText: 'МП',
    hasAttachment: true,
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '7',
    sender: 'Анна Рябова (помощник)',
    subject: 'Напоминание: 3 дела без ответа клиентам',
    preview: 'Соколова, Ветров и Тихонов ждут обратной связи больше 48 часов. Черновики лежат в папке «Черновики».',
    date: '27 июн',
    avatarColor: 'bg-emerald-600',
    avatarText: 'АР',
    isNew: true,
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '8',
    sender: 'Пётр Тихонов',
    subject: 'Трудовой спор — увольнение по ст. 81',
    preview: 'Работодатель уволил меня «по соглашению сторон», хотя я не подписывал. Есть переписка в WhatsApp. Можем встретиться?',
    date: '27 июн',
    avatarColor: 'bg-blue-700',
    avatarText: 'ПТ',
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '9',
    sender: 'advokat.sidorov@yandex.ru',
    subject: 'Re: дело Кузнецова — предложение о мировом',
    preview: 'Коллега, мой доверитель готов обсудить мировое на условиях рассрочки. Предлагаю созвониться завтра до 12:00.',
    date: '27 июн',
    avatarColor: 'bg-neutral-700',
    avatarText: 'СА',
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '10',
    sender: 'Наталья Белова',
    subject: 'Спасибо за консультацию + ещё один вопрос',
    preview: 'Вы помогли с квартиру после развода. Теперь бывший муж подал на алименты на нашего сына. Это вообще законно?',
    date: '27 июн',
    avatarColor: 'bg-pink-600',
    avatarText: 'НБ',
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '11',
    sender: 'ФССП России',
    subject: 'Постановление о возбуждении исполнительного производства',
    preview: 'По исполнительному листу ФС № 928174 от 27.06.2027 возбуждено производство. Сумма взыскания: 847 500 ₽.',
    date: '27 июн',
    avatarColor: 'bg-red-700',
    avatarText: 'ФС',
    hasAttachment: true,
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '12',
    sender: 'Сергей Ланской',
    subject: 'Re: договор аренды — претензия арендодателя',
    preview: 'Прислал фото повреждений, которых не было при сдаче. Арендодатель требует 180 000 ₽. Что делаем?',
    date: '27 июн',
    avatarColor: 'bg-amber-700',
    avatarText: 'СЛ',
    hasAttachment: true,
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '13',
    sender: 'Коллегия адвокатов № 47',
    subject: 'Повестка на заседание дисциплинарной комиссии',
    preview: 'Уведомляем о рассмотрении жалобы по делу № ДК-2027/118. Дата: 28 июня 2027, 14:00, ул. Поварская, 29/36.',
    date: '27 июн',
    avatarColor: 'bg-indigo-800',
    avatarText: 'КА',
    isStarred: true,
    hasAttachment: true,
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '14',
    sender: 'Виктория Чернова',
    subject: 'Банкротство физлица — первичная консультация',
    preview: 'Долги ~2,3 млн, зарплата 65 000. Ипотека на единственное жильё. Можно ли сохранить квартиру? Когда у вас окно?',
    date: '27 июн',
    avatarColor: 'bg-cyan-700',
    avatarText: 'ВЧ',
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '15',
    sender: 'Алексей Громов',
    subject: 'Fwd: повестка в полицию по ст. 159 УК РФ',
    preview: 'Пересылаю повестку. Меня обвиняют в мошенничестве по сделке с землёй. Нужен адвокат на допрос, это в пятницу.',
    date: '27 июн',
    avatarColor: 'bg-stone-600',
    avatarText: 'АГ',
    isImportant: true,
    hasAttachment: true,
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '16',
    sender: 'Татьяна Жукова',
    subject: 'Re: опека над матерью — статус дела',
    preview: 'Органы опеки запросили дополнительные справки. Отправила медзаключение. Когда подадим в суд?',
    date: '27 июн',
    avatarColor: 'bg-fuchsia-600',
    avatarText: 'ТЖ',
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '17',
    sender: 'Нотариус И.В. Крылова',
    subject: 'Запрос документов по доверенности № 1847',
    preview: 'Для совершения нотариального действия требуется оригинал доверенности и паспорт доверителя. Срок — до 4 июля 2027.',
    date: '27 июн',
    avatarColor: 'bg-purple-700',
    avatarText: 'ИК',
    hasAttachment: true,
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '18',
    sender: 'Роман Данилов',
    subject: 'ДТП — страховая занижает выплату',
    preview: 'ОСАГО предлагает 340 000 вместо 580 000 по независимой экспертизе. Хочу обжаловать. Сколько стоят ваши услуги?',
    date: '27 июн',
    avatarColor: 'bg-lime-700',
    avatarText: 'РД',
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '19',
    sender: 'ФПА РФ',
    subject: 'Ежегодный взнос адвоката — квитанция',
    preview: 'Напоминаем об уплате членского взноса за 2027 год. Сумма: 12 000 ₽. Срок — до 30 июня.',
    date: '27 июн',
    avatarColor: 'bg-blue-900',
    avatarText: 'ФП',
    hasAttachment: true,
    group: 'today',
    folderId: 'inbox',
  },
  {
    id: '20',
    sender: 'Юлия Костина',
    subject: 'Re: спасибо — рекомендую вас знакомым',
    preview: 'Дело выиграли, огромное спасибо! Подруга ищет адвоката по разводу — можно дать ваш контакт?',
    date: '27 июн',
    avatarColor: 'bg-rose-400',
    avatarText: 'ЮК',
    isStarred: true,
    group: 'today',
    folderId: 'inbox',
  },

  // ── Коллеги и партнёры ──
  {
    id: '21',
    sender: 'Адвокат Смирнов',
    subject: 'Передал вам клиента — семейный спор',
    preview: 'Не тяну нагрузку, клиентка из Химок, раздел квартиры. Контакт в приложении. Процент стандартный.',
    date: '27 июн',
    avatarColor: 'bg-sky-700',
    avatarText: 'СМ',
    group: 'today',
    folderId: 'social',
  },
  {
    id: '22',
    sender: 'Коллегия — общий чат',
    subject: 'Изменения в регламенте приёма доверителей',
    preview: 'С 1 июля новый порядок записи через портал. Инструкция во вложении.',
    date: '27 июн',
    avatarColor: 'bg-indigo-600',
    avatarText: 'КА',
    hasAttachment: true,
    group: 'today',
    folderId: 'social',
  },
  {
    id: '23',
    sender: 'Адвокат Орлова',
    subject: 'Re: совместное дело — доля гонорара',
    preview: 'По делу «СтройКом» предлагаю 60/40, учитывая ваш объём подготовки. Если согласны — подпишем соглашение.',
    date: '27 июн',
    avatarColor: 'bg-emerald-700',
    avatarText: 'ОА',
    group: 'today',
    folderId: 'social',
  },

  // ── Профессиональные рассылки ──
  {
    id: '24',
    sender: 'Право.ru',
    subject: 'Обзор практики ВС РФ за неделю',
    preview: 'Ключевые определения по семейным, трудовым и налоговым спорам. Краткий дайджест для практикующих юристов.',
    date: '27 июн',
    avatarColor: 'bg-neutral-800',
    avatarText: 'Пр',
    group: 'today',
    folderId: 'newsletters',
  },
  {
    id: '25',
    sender: 'Закон.ру',
    subject: 'Новые поправки в ГК РФ — что меняется с 1 июля',
    preview: 'Разбор изменений по договорным обязательствам и срокам исковой давности.',
    date: '27 июн',
    avatarColor: 'bg-orange-700',
    avatarText: 'ЗР',
    group: 'today',
    folderId: 'newsletters',
  },

  // ── Госорганы и суды ──
  {
    id: '26',
    sender: 'ГАС «Правосудие»',
    subject: 'Электронная повестка — дело № 2-3847/2027',
    preview: 'Судебное заседание назначено на 30.06.2027 в 11:30. Судья: Иванова М.С. Зал № 304.',
    date: '27 июн',
    avatarColor: 'bg-red-700',
    avatarText: 'ГП',
    hasAttachment: true,
    group: 'today',
    folderId: 'government',
  },
  {
    id: '27',
    sender: 'ФНС России',
    subject: 'Требование о представлении документов',
    preview: 'По результатам камеральной проверки ИП Адковат А.А. необходимо представить пояснения до 05.07.2027.',
    date: '27 июн',
    avatarColor: 'bg-red-800',
    avatarText: 'ФН',
    hasAttachment: true,
    isImportant: true,
    group: 'today',
    folderId: 'government',
  },
  {
    id: '28',
    sender: 'Горсуд г. Энска',
    subject: 'Кассационная жалоба принята к производству',
    preview: 'По делу № 33-18472/2027 назначена дата судебного заседания — 3 июля 2027, 10:00.',
    date: '27 июн',
    avatarColor: 'bg-blue-800',
    avatarText: 'МС',
    hasAttachment: true,
    group: 'today',
    folderId: 'government',
  },

  // ── Новости ──
  {
    id: '29',
    sender: 'РБК.Право',
    subject: 'ВС РФ ужесточил подход к алиментам',
    preview: 'Обзор свежей судебной практики и комментарии экспертов.',
    date: '27 июн',
    avatarColor: 'bg-green-700',
    avatarText: 'РБ',
    group: 'today',
    folderId: 'news',
  },

  // ── Оплаты и чеки ──
  {
    id: '30',
    sender: 'Т-Банк',
    subject: 'Поступление 85 000 ₽ — гонорар',
    preview: 'На счёт *7291 зачислен перевод от Елена Соколова. Назначение: «Оплата юридических услуг, договор № 47».',
    date: '27 июн',
    avatarColor: 'bg-yellow-400',
    avatarText: 'Т',
    hasAttachment: true,
    group: 'today',
    folderId: 'receipts',
  },
  {
    id: '31',
    sender: 'Сбербанк Бизнес',
    subject: 'Выписка по расчётному счёту',
    preview: 'Оборот за период 20.06–27.06.2027. Доступна в личном кабинете.',
    date: '27 июн',
    avatarColor: 'bg-green-600',
    avatarText: 'С',
    hasAttachment: true,
    group: 'today',
    folderId: 'receipts',
  },

  // ── Повышение квалификации ──
  {
    id: '32',
    sender: 'ФПА РФ — обучение',
    subject: 'Семинар «Защита по уголовным делам» — регистрация',
    preview: 'Очный семинар 5–6 июля 2027, Энск. Зачёт 16 часов. Мест осталось: 12.',
    date: '27 июн',
    avatarColor: 'bg-blue-800',
    avatarText: 'ФП',
    group: 'today',
    folderId: 'study',
  },

  // ── Письма себе ──
  {
    id: '33',
    sender: 'Я',
    subject: 'Список дел на понедельник',
    preview: '1. Соколова — заседание 10:00 2. Кузнецов — ответ по мировому 3. Подготовить ходатайство по Ветрову',
    date: '27 июн',
    avatarColor: 'bg-violet-500',
    avatarText: 'Я',
    group: 'today',
    folderId: 'self',
  },
  {
    id: '34',
    sender: 'Я',
    subject: 'Шаблон доверенности — правки',
    preview: 'Добавить пункт о представительстве в ФССП. Проверить формулировку по ст. 50 ГПК.',
    date: '27 июн',
    avatarColor: 'bg-violet-500',
    avatarText: 'Я',
    group: 'today',
    folderId: 'self',
  },

  // ── Отправленные ──
  {
    id: '35',
    sender: 'Адковат А.А.',
    subject: 'Re: документы по наследству',
    preview: 'Ольга, получил вложения. Завтра до 18:00 пришлю заключение и список недостающих бумаг для нотариуса.',
    date: '27 июн',
    avatarColor: 'bg-emerald-600',
    avatarText: 'АА',
    group: 'today',
    folderId: 'sent',
  },
  {
    id: '36',
    sender: 'Адковат А.А.',
    subject: 'Re: трудовой спор — план действий',
    preview: 'Пётр, для начала нужны трудовой договор, приказ об увольнении и переписка с HR. Встречаемся в среду в 15:00.',
    date: '27 июн',
    avatarColor: 'bg-emerald-600',
    avatarText: 'АА',
    group: 'today',
    folderId: 'sent',
  },

  // ── Черновики ──
  {
    id: '37',
    sender: 'Черновик',
    subject: 'Re: отзыв на иск — срок подачи',
    preview: 'Дмитрий, добрый день. Документы получил, всё на месте. Отзыв на иск подготовим и направим в суд до четверга включительно...',
    date: '27 июн',
    avatarColor: 'bg-gray-400',
    avatarText: '…',
    group: 'today',
    folderId: 'drafts',
  },
  {
    id: '38',
    sender: 'Черновик',
    subject: 'Ответ ФНС — пояснения по проверке',
    preview: 'Уважаемые господа инспекторы, в ответ на требование № 2847 сообщаем следующее...',
    date: '27 июн',
    avatarColor: 'bg-gray-400',
    avatarText: '…',
    group: 'today',
    folderId: 'drafts',
  },
  {
    id: '39',
    sender: 'Черновик',
    subject: 'Re: алименты — встречный иск',
    preview: 'Марина, ознакомился с документами. Рекомендую подать возражения в течение 15 дней...',
    date: '27 июн',
    avatarColor: 'bg-gray-400',
    avatarText: '…',
    group: 'today',
    folderId: 'drafts',
  },

  // ── Спам ──
  {
    id: '40',
    sender: 'ЮрКонсалт 24/7',
    subject: 'Выиграем любой суд за 3 дня!!!',
    preview: 'Гарантия 100%. Без предоплаты. Звоните прямо сейчас!',
    date: '27 июн',
    avatarColor: 'bg-yellow-600',
    avatarText: '$',
    group: 'today',
    folderId: 'spam',
  },

  // ── Корзина ──
  {
    id: '41',
    sender: 'Старый клиент',
    subject: 'Re: дело закрыто',
    preview: 'Спасибо за работу. Больше не беспокою.',
    date: '27 июн',
    avatarColor: 'bg-gray-500',
    avatarText: 'СК',
    group: 'today',
    folderId: 'trash',
  },
]

export const sidebarFolders: SidebarFolder[] = [
  { id: 'inbox', label: 'Входящие', path: '/inbox', count: '999+', icon: 'inbox' },
  { id: 'social', label: 'Коллеги', path: '/social', count: '8', icon: 'users' },
  { id: 'newsletters', label: 'Рассылки', path: '/newsletters', count: '24', icon: 'megaphone' },
  { id: 'government', label: 'Госписьма', path: '/government', count: '11', icon: 'landmark' },
  { id: 'news', label: 'Новости', path: '/news', count: '15', icon: 'newspaper' },
  { id: 'receipts', label: 'Оплаты', path: '/receipts', count: '6', icon: 'receipt' },
  { id: 'study', label: 'Обучение', path: '/study', count: '3', icon: 'graduation-cap' },
  { id: 'games', label: 'Архив', path: '/games', icon: 'gamepad-2' },
  { id: 'self', label: 'Письма себе', path: '/self', count: '2', icon: 'user' },
  { id: 'notes', label: 'Заметки', path: '/notes', icon: 'sticky-note' },
  { id: 'sent', label: 'Отправленные', path: '/sent', icon: 'send' },
  { id: 'drafts', label: 'Черновики', path: '/drafts', count: '7', icon: 'file-edit' },
  { id: 'templates', label: 'Шаблоны', path: '/templates', icon: 'layout-template' },
  { id: 'spam', label: 'Спам', path: '/spam', count: '89', icon: 'shield-alert' },
  { id: 'trash', label: 'Корзина', path: '/trash', icon: 'trash-2' },
]

export const SPECIAL_MAIL_ID = 'special-alert'

export function createSpecialMail(): MailItem {
  return {
    id: SPECIAL_MAIL_ID,
    sender: 'anonymus',
    subject: 'вы это ищете?',
    preview: 'вы это ищете?',
    date: '27 июн',
    avatarColor: 'bg-neutral-600',
    avatarText: 'a',
    isImportant: true,
    isStarred: true,
    group: 'today',
    folderId: 'inbox',
  }
}

export function getFolderById(folderId: string) {
  return sidebarFolders.find((folder) => folder.id === folderId)
}

export function getMailsByFolder(folderId: string) {
  return mockMails.filter((mail) => mail.folderId === folderId)
}

export function getMailById(mailId: string) {
  return mockMails.find((mail) => mail.id === mailId)
}

export function getMailPath(folderId: string, mailId: string) {
  const folder = getFolderById(folderId)
  return folder ? `${folder.path}/${mailId}` : `/inbox/${mailId}`
}

export function getMailBody(mail: MailItem) {
  const lines = [
    'Здравствуйте, Адковат Андрей Андреевич!',
    '',
    mail.preview,
    '',
  ]

  if (mail.hasAttachment) {
    lines.push('Документы во вложении.', '')
  }

  if (mail.folderId === 'inbox' && mail.sender.includes('(')) {
    lines.push('Прошу связаться в ближайшее время.', '')
  } else if (mail.sender.includes('суд') || mail.sender.includes('Суд')) {
    lines.push('Просим ознакомиться с приложенными материалами в установленный срок.', '')
  } else {
    lines.push('Буду ждать вашего ответа.', '')
  }

  lines.push(`С уважением,\n${mail.sender}`)

  return lines.join('\n')
}

export const topNavItems = [
  'Главная',
  'Почта',
  'Облако',
  'Календарь',
  'Документы',
  'Заметки',
  'Контакты',
  'Задачи',
]
