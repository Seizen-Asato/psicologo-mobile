|               | **`useQuery`**           | **`useMutation`**                            | **`useQueryClient`**                             |
| ------------- | ------------------------ | -------------------------------------------- | ------------------------------------------------ |
| **Propósito** | Leer/obtener datos (GET) | Escribir/modificar datos (POST, PUT, DELETE) | Acceder al `QueryClient` para manipular la caché |

| **Ejecución** | Automática (declarativa) | Manual, se invoca con `mutate()` o `mutateAsync()` (imperativa) | No ejecuta nada por sí solo; expone métodos del client |

| **Caché** | ✅ Sí, almacena y reutiliza | ❌ No comparte caché entre instancias | Gestiona la caché directamente |

| **Estado** | `data`, `isPending`, `isError`, `refetch` | `data`, `isPending`, `isError`, `mutate`, `reset` | — |

| **Reintentos** | 3 por defecto | 0 por defecto | — |

| **Optimistic updates** | ❌ | ✅ (vía `onMutate`) | — |

flujo típico:

useQuery fetchea y cachea los datos.
useMutation envía la modificación al servidor.
useQueryClient → invalidateQueries() marca la caché como obsoleta → useQuery refetchea automáticamente.

## useQueryClient

QueryClient es el gestor central de estado del servidor y el motor de caché que controla toda la lógica de obtención y almacenamiento de datos en React Query (TanStack Query).

Actúa como el cerebro de la biblioteca, realizando las siguientes funciones principales:

Gestión de Caché: Almacena y organiza todos los datos de consultas y mutaciones, evitando refetches innecesarios.

Ciclo de Vida de Datos: Controla la lógica de refetch (al reconectar, enfocar la ventana o por intervalo), el manejo de reintentos en caso de error y la colecta de basura (garbage collection) para limpiar la memoria.

Sincronización de UI: Notifica a los componentes de React cuando los datos cambian, actualizando la interfaz de usuario de manera eficiente sin prop drilling.

Interacción Programática: Permite acceder a los datos en caché (getQueryData), actualizarlos directamente (setQueryData) o invalidarlos para forzar una actualización (invalidateQueries) desde cualquier parte de la aplicación.

## useMutation

Es el hook de TanStack Query para operaciones de escritura contra el servidor (POST, PUT, PATCH, DELETE). A diferencia de useQuery, no se ejecuta automáticamente: vos decides cuándo dispara la función.

Qué hace exactamente
Envuelve una función asíncrona (mutationFn) y la ejecuta bajo demanda con mutate() o mutateAsync().

Expone el estado de la operación en tiempo real: isPending, isSuccess, isError, data, error.

Fuea callbacks en cada etapa del ciclo:

| Callback    | Cuándo se dispara                                             |
| ----------- | ------------------------------------------------------------- |
| `onMutate`  | Antes de enviar la petición (ideal para _optimistic updates_) |
| `onSuccess` | Cuando el servidor responde correctamente                     |
| `onError`   | Cuando falla                                                  |
| `onSettled` | Siempre, sin importar el resultado                            |

No cachea el resultado entre instancias (a diferencia de useQuery).

No reintenta por defecto (retry: 0), aunque se puede configurar.

La UI se actualiza instantáneamente antes de que el servidor responda, y si falla, se revierte

## useQuery

Es el hook principal de TanStack Query para leer datos del servidor de forma declarativa. Se ejecuta automáticamente al montar el componente y gestiona todo el ciclo de vida de la petición por vos.

| Función                 | Detalle                                                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| **Fetch automático**    | Ejecuta `queryFn` al montar, sin `useEffect` ni `useState`                                   |
| **Caché**               | Almacena el resultado por `queryKey`; si otro componente pide lo mismo, no refetchea         |
| **Refetch inteligente** | Refetchea en segundo plano al enfocar la ventana, reconectar o cuando el dato pasa a _stale_ |
| **Reintentos**          | 3 reintentos con backoff exponencial por defecto                                             |
| **Estados de UI**       | Expone `isPending`, `isError`, `isFetching`, `isStale`, `data`, `refetch()`                  |
| **Garbage collection**  | Limpia datos inactivos de la caché automáticamente                                           |

Opciones clave
queryKey — Identificador único; mismo key = misma caché.
enabled — false para no fetchear (útil para dependent queries).
staleTime — Cuánto tiempo el dato se considera "fresco" sin refetch.
refetchInterval — Polling periódico (ej: datos en vivo).
select — Transforma el dato de forma memoizada (evita re-renders).
placeholderData — Muestra datos previos mientras carga (ej: keepPreviousData en paginación).
