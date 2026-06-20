import {
  Heart,
  LayoutGrid,
  Search,
  ShoppingCart,
  User,
} from 'lucide-react'

import { getMachineImagesForProducts } from '@/assets/machines'
import { CornerShootModeSettings } from '@/components/mail/corner-shoot-mode-settings'

const BRAND_RED = '#e31235'
const PAGE_BG = '#f2f2f2'

const NAV_LINKS = [
  'Акции',
  'Рассрочка',
  'Доставка',
  'Магазины',
  'Поддержка',
  'Бонусная программа',
]

const FILTERS = ['Цена', 'Бренд', 'Загрузка', 'Скорость отжима', 'Класс энергии', 'Цвет']

const PRODUCTS = [
  {
    id: 1,
    price: 49_999,
    specs: ['7 кг', '1200 об/мин', 'Инверторный двигатель'],
  },
  {
    id: 2,
    price: 37_490,
    specs: ['6 кг', '1000 об/мин', '14 программ стирки'],
  },
  {
    id: 3,
    price: 62_990,
    specs: ['9 кг', '1400 об/мин', 'Паровая обработка'],
  },
  {
    id: 4,
    price: 28_990,
    specs: ['5 кг', '800 об/мин', 'Компактная модель'],
  },
  {
    id: 5,
    price: 54_500,
    specs: ['8 кг', '1200 об/мин', 'Direct drive'],
  },
  {
    id: 6,
    price: 41_200,
    specs: ['7 кг', '1000 об/мин', 'Защита от протечек'],
  },
  {
    id: 7,
    price: 71_990,
    specs: ['10 кг', '1600 об/мин', 'Wi‑Fi управление'],
  },
  {
    id: 8,
    price: 33_790,
    specs: ['6 кг', '1000 об/мин', 'Быстрая стирка 15 мин'],
  },
  {
    id: 9,
    price: 45_990,
    specs: ['7 кг', '1200 об/мин', 'A+++ класс энергии'],
  },
  {
    id: 10,
    price: 39_490,
    specs: ['6 кг', '1000 об/мин', 'Отложенный старт'],
  },
  {
    id: 11,
    price: 58_790,
    specs: ['8 кг', '1400 об/мин', 'Автодозация моющего'],
  },
  {
    id: 12,
    price: 31_990,
    specs: ['5 кг', '800 об/мин', 'Узкая модель 40 см'],
  },
  {
    id: 13,
    price: 67_500,
    specs: ['9 кг', '1400 об/мин', 'Тихий двигатель 47 дБ'],
  },
  {
    id: 14,
    price: 42_890,
    specs: ['7 кг', '1200 об/мин', '16 программ стирки'],
  },
  {
    id: 15,
    price: 26_490,
    specs: ['4 кг', '700 об/мин', 'Для дачи и гостиниц'],
  },
  {
    id: 16,
    price: 52_300,
    specs: ['8 кг', '1200 об/мин', 'Сушка до 5 кг'],
  },
  {
    id: 17,
    price: 48_150,
    specs: ['7 кг', '1000 об/мин', 'Загрузка AddWash'],
  },
  {
    id: 18,
    price: 36_990,
    specs: ['6 кг', '1000 об/мин', 'Детская блокировка'],
  },
  {
    id: 19,
    price: 74_990,
    specs: ['10 кг', '1600 об/мин', 'Сушка и пар'],
  },
  {
    id: 20,
    price: 29_790,
    specs: ['5 кг', '800 об/мин', 'Экономичный режим'],
  },
  {
    id: 21,
    price: 55_690,
    specs: ['8 кг', '1200 об/мин', 'Антибактериальная обработка'],
  },
  {
    id: 22,
    price: 43_500,
    specs: ['7 кг', '1000 об/мин', 'Сенсорное управление'],
  },
  {
    id: 23,
    price: 38_290,
    specs: ['6 кг', '1000 об/мин', 'Серебряный бак'],
  },
  {
    id: 24,
    price: 61_400,
    specs: ['9 кг', '1400 об/мин', 'Удаление пятен 40°C'],
  },
]

function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₽`
}

const PRODUCT_IMAGES = getMachineImagesForProducts(PRODUCTS.length)

export function WashingMachinesPage() {
  return (
    <div className="min-h-svh text-[#1a1a1a]" style={{ backgroundColor: PAGE_BG }}>
      <header style={{ backgroundColor: BRAND_RED }}>
        <div className="mx-auto flex h-[56px] max-w-[1280px] items-center gap-3 px-4">
          <div className="size-9 shrink-0 rounded-lg bg-white/20" aria-hidden />

          <button
            type="button"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-white px-4 text-[14px] font-medium text-[#333]"
          >
            <LayoutGrid className="size-4" />
            Каталог
          </button>

          <label className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#999]" />
            <input
              readOnly
              placeholder="Поиск по каталогу"
              className="h-10 w-full rounded-full bg-white pr-4 pl-11 text-[14px] text-[#333] outline-none placeholder:text-[#999]"
            />
          </label>

          <div className="flex shrink-0 items-center gap-1 text-white">
            <button type="button" className="rounded-full p-2.5 hover:bg-white/10">
              <User className="size-5" />
            </button>
            <button type="button" className="rounded-full p-2.5 hover:bg-white/10">
              <Heart className="size-5" />
            </button>
            <button type="button" className="rounded-full p-2.5 hover:bg-white/10">
              <ShoppingCart className="size-5" />
            </button>
          </div>
        </div>

        <div className="border-t border-white/15" style={{ backgroundColor: BRAND_RED }}>
          <nav className="mx-auto flex max-w-[1280px] items-center gap-5 overflow-x-auto px-4 py-2.5 text-[13px] text-white/95">
            {NAV_LINKS.map((link) => (
              <button key={link} type="button" className="shrink-0 whitespace-nowrap hover:text-white">
                {link}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-4 py-6">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className="rounded-full border border-[#ddd] bg-white px-4 py-2 text-[13px] text-[#444] shadow-sm"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {PRODUCTS.map((product, index) => (
            <article
              key={product.id}
              className="relative flex flex-col rounded-2xl border border-[#ececec] bg-white p-3 shadow-sm"
            >
              <div className="mb-3 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#f7f7f7] p-2">
                <img
                  src={PRODUCT_IMAGES[index]}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <p className="text-[22px] leading-none font-bold tracking-tight text-[#111]">
                {formatPrice(product.price)}
              </p>

              <ul className="mt-3 space-y-1 text-[12px] leading-snug text-[#666]">
                {product.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>

              <button
                type="button"
                className="absolute right-3 bottom-3 flex size-10 items-center justify-center rounded-xl text-white shadow-sm"
                style={{ backgroundColor: BRAND_RED }}
                aria-label="В корзину"
              >
                <ShoppingCart className="size-4" />
              </button>
            </article>
          ))}
        </div>
      </main>

      <CornerShootModeSettings />
    </div>
  )
}
