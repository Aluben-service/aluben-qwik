import type {RequestHandler} from '@builder.io/qwik-city'
import {guessLocale} from 'compiled-i18n'

export const onGet: RequestHandler = async ({request, redirect, url}) => {
	const acceptLang = request.headers.get('accept-language')
	const guessedLocale = guessLocale(acceptLang)
	throw redirect(301, `/${guessedLocale}/${url.search}`)
}