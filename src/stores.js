import config from 'config'

import comments from './store/comments'
import auth from './store/auth'
import userinfo from './store/userinfo'
import router from './store/router'
import MapStore from './store/mapStore'

// const stores_list = { years, year, points }

// class Stores {
//     // get years () {return years.get()}
//     // get year () {return year.get()}
//     // get points () {return points.get()}
// }

// let stores = new Stores()

// Proxy version of the above code. Currently only for FF...
// let handler = {get: (target, name) => {
//     return target[name].get()
// }}
// let stores = new Proxy(stores_list, handler)


let moneyApi = config.apiurl_money
let commentsApi = config.apiurl_comments


// Store for details about a point
class PointInfo extends MapStore {
    ajaxParams(key) {
        let url = `${moneyApi}/execucao/list?code=${key}`,
            method = 'get'
        return {url, method}
    }
    processResponse(response) {
        return response.json.data[0]
    }
}
let pointinfo = new PointInfo('pointinfo')


// Store for list of points for map
class Points extends MapStore {
    ajaxParams(key) {
        let url = `${moneyApi}/execucao/minlist/${key}?state=1&capcor=1`,
            method = 'get'
        return {url, method}
    }
    processResponse(response) {
        return response.json
    }
}
let points = new Points('points')


// Store for general data about an year
class YearInfo extends MapStore {
    ajaxParams(key) {
        let url = `${moneyApi}/execucao/info/${key}`,
            method = 'get'
        return {url, method}
    }
    processResponse(response) {
        return response.json.data
    }
}
let yearinfo = new YearInfo('yearinfo')


// Store for dynamic table
class TableData extends MapStore {
    ajaxParams(key) {
        let [ year, page ] = key.split('-'),
            url = `${moneyApi}/execucao/list?year=${year}&page=${page}&per_page_num=25`,
            method = 'get'
        return {url, method}
    }
    processResponse(response) {
        this.totalRows = response.meta.headers.get('X-Total-Count')
        return response.json.data
    }
    getTotal() { return this.totalRows }
}
let tabledata = new TableData('tabledata')


// Store for year list
class Years extends MapStore {
    ajaxParams(key) {
        let url = `${moneyApi}/execucao/info`,
            method = 'get'
        return {url, method}
    }
    processResponse(response) {
        return response.json.data.years
    }
}
let years = new Years('years')
years.forceKey = 'years'


// Store for money updates
class MoneyUpdates extends MapStore {
    ajaxParams(key) {
        let url = `${moneyApi}/execucao/updates?per_page_num=20&has_key=state`,
            method = 'get'
        return {url, method}
    }
    processResponse(response) {
        return response.json.data
    }
}
let moneyUpdates = new MoneyUpdates('moneyUpdates')
moneyUpdates.forceKey = 'moneyUpdates'


// Store for comments updates
class CommentsUpdates extends MapStore {
    ajaxParams(key) {
        let url = `${commentsApi}/comment`,
            method = 'get'
        return {url, method}
    }
    processResponse(response) {
        return response.json.comments
    }
}
let commentsUpdates = new CommentsUpdates('commentsUpdates')
commentsUpdates.forceKey = 'commentsUpdates'

export default {tabledata}
