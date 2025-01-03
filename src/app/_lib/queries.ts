import "server-only"

import { unstable_noStore as noStore } from "next/cache"
import { db } from "@/db"
import { tasks, views, type Task } from "@/db/schema"
import type { DrizzleWhere } from "@/types"
import { and, asc, count, desc, gte, lte, or, sql, type SQL } from "drizzle-orm"

import { filterColumn } from "@/lib/filter-column"

import { type GetTasksSchema } from "./validations"
import { da } from "@faker-js/faker"

export async function getTasks(input: GetTasksSchema) {
  noStore()
  const { page, per_page, sort, title, status, priority, operator, from, to } =
    input

  try {
    // Offset to paginate the results
    const offset = (page - 1) * per_page
    // Column and order to sort by
    // Spliting the sort string by "." to get the column and order
    // Example: "title.desc" => ["title", "desc"]
    const [column, order] = (sort?.split(".").filter(Boolean) ?? [
      "createdAt",
      "desc",
    ]) as [keyof Task | undefined, "asc" | "desc" | undefined]

    // Convert the date strings to date objects
    const fromDay = from ? sql`to_date(${from}, 'yyyy-mm-dd')` : undefined
    const toDay = to ? sql`to_date(${to}, 'yyyy-mm-dd')` : undefined

    // @ts-ignore
    const data = [
      {
        id: '9d5f2697-4b03-4377-abbf-94d40f4afeb8',
        code: 'TASK-8460',
        title: 'Use the optical SMS sensor, then you can compress the optical circuit!',
        status: 'done',
        label: 'enhancement',
        priority: 'high',
        createdAt: "2024-12-26T16:36:31.655Z",
        updatedAt: "2024-12-26T16:36:31.655Z",
      }
    ]

    console.log('Getting dataResponse')
    const dataResponse = await fetch('http://next.ddev.site/api/inventory/items-by-quantity/2631/1999-11-04')
    console.log('Got dataResponse');
    const responseData = await dataResponse.json();
    // @ts-ignore
    console.log(responseData)
    //console.log(dataResponse.json())
    const total = 1

    // const expressions: (SQL<unknown> | undefined)[] = [
    //   title
    //     ? filterColumn({
    //         column: tasks.title,
    //         value: title,
    //       })
    //     : undefined,
    //   // Filter tasks by status
    //   !!status
    //     ? filterColumn({
    //         column: tasks.status,
    //         value: status,
    //         isSelectable: true,
    //       })
    //     : undefined,
    //   // Filter tasks by priority
    //   !!priority
    //     ? filterColumn({
    //         column: tasks.priority,
    //         value: priority,
    //         isSelectable: true,
    //       })
    //     : undefined,
    //   // Filter by createdAt
    //   fromDay && toDay
    //     ? and(gte(tasks.createdAt, fromDay), lte(tasks.createdAt, toDay))
    //     : undefined,
    // ]
    // const where: DrizzleWhere<Task> =
    //   !operator || operator === "and" ? and(...expressions) : or(...expressions)

    // // Transaction is used to ensure both queries are executed in a single transaction
    // const { data, total } = await db.transaction(async (tx) => {
    //   const data = await tx
    //     .select()
    //     .from(tasks)
    //     .limit(per_page)
    //     .offset(offset)
    //     .where(where)
    //     .orderBy(
    //       column && column in tasks
    //         ? order === "asc"
    //           ? asc(tasks[column])
    //           : desc(tasks[column])
    //         : desc(tasks.id)
    //     )

    //   const total = await tx
    //     .select({
    //       count: count(),
    //     })
    //     .from(tasks)
    //     .where(where)
    //     .execute()
    //     .then((res) => res[0]?.count ?? 0)

    //   return {
    //     data,
    //     total,
    //   }
    // })

    const pageCount = Math.ceil(total / per_page)
    // @ts-ignore
    return { data, pageCount }
  } catch (err) {
    return { data: [], pageCount: 0 }
  }
}

export async function getTaskCountByStatus() {
  noStore()
  try {
    return await db
      .select({
        status: tasks.status,
        count: count(),
      })
      .from(tasks)
      .groupBy(tasks.status)
      .execute()
  } catch (err) {
    return []
  }
}

export async function getTaskCountByPriority() {
  noStore()
  try {
    return await db
      .select({
        priority: tasks.priority,
        count: count(),
      })
      .from(tasks)
      .groupBy(tasks.priority)
      .execute()
  } catch (err) {
    return []
  }
}

export async function getViews() {
  noStore()
  return await db
    .select({
      id: views.id,
      name: views.name,
      columns: views.columns,
      filterParams: views.filterParams,
    })
    .from(views)
    .orderBy(desc(views.createdAt))
}
