const createDomPurifier = require("dompurify");
const { JSDOM } = require('jsdom')
const dompurify = createDomPurifier(new JSDOM().window);
const { marked } = require("marked");
const { Article } = require("../models/Article")

module.exports = {

  format_date: date => {
    console.log('here')
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  },

  format_plural: (word, amount) => {
      if (amount !== 1) {
        return `${word}s`;
      }
  
      return word;
  },

  // makeMarkdown: () => {
  //   if (Article.article_content) {
  //       const sanitizedHtml = dompurify.sanitize(marked(article_content))
  //     return `${sanitizedHtml}`
  //   } 
  //   return sanitizedHtml
  // }
}