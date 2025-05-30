import type { Middleware, Dispatch, UnknownAction } from '@reduxjs/toolkit'
import { io, Socket } from 'socket.io-client'

type SocketMeta = {
    remote?: boolean
}

type SocketAction = UnknownAction & {
    meta?: SocketMeta
    payload?: unknown
}

export const createSocketMiddleware = (
    url: string
): Middleware<Dispatch<UnknownAction>> => {
    let socket: Socket | null = null

    return (store) => {
        socket = io(url)

        socket.on('action', (msg: SocketAction) => {
            console.log('Action reçue du serveur via socket.io :', msg)
            if (msg.meta?.remote) return

            store.dispatch({ ...msg, meta: { ...msg.meta, remote: true } })
        })

        return (next) => (action) => {
            if (
                typeof action === 'object' &&
                action !== null &&
                'type' in action
            ) {
                const typedAction = action as SocketAction

                const actionsÀPropager = [
                    'events/createQuestion',
                    'events/deleteQuestion',
                    'events/updateQuestion',
                    'events/setQuestion',
                    'events/upvoteQuestion',
                ]

                if (
                    actionsÀPropager.includes(typedAction.type) &&
                    !typedAction.meta?.remote
                ) {
                    if (typedAction.type === 'events/createQuestion') {
                        const payload = typedAction.payload as {
                            question: { content: string }
                        }
                        console.log(
                            `Nouvelle question ajoutée : ${payload.question.content}`
                        )
                    } else if (typedAction.type === 'events/upvoteQuestion') {
                        const payload = typedAction.payload as {
                            questionId: string
                        }
                        console.log(
                            `Vote ajouté pour la question ${payload.questionId}`
                        )
                    } else if (typedAction.type === 'events/deleteQuestion') {
                        const payload = typedAction.payload as {
                            questionId: string
                        }
                        console.log(
                            `Question supprimée : ${payload.questionId}`
                        )
                    }

                    socket?.emit('action', typedAction)
                }
            }

            return next(action)
        }
    }
}
