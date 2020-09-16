const express = require('express')
const router = express.Router()

const todo = require('../../models/todo')
router.use(express.static('public'))

const Vue = require('vue')
const Vuex = require('vuex')

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

const test = function () {
  console.log(store.state.count)
}

test()

router.get('/', (req, res) => {
  todo.find()// 從資料庫找出資料
    .lean()// 轉圜單純JS物件
    .sort({ _id: 'asc' })// desc
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

module.exports = router
