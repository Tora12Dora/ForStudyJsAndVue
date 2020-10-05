/* в /helpers, как правило, находятся вспомогательные функции */
import { format } from 'date-fns'; /* импортируем функцию format */


export function formatDate(str, type) { /* передаем дату в виде строки и формат */
  const date = new Date(str);
  return format(date, type)
}