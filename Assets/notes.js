const createDomPurifier = require("dompurify");
const { JSDOM } = require('jsdom')
const dompurify = createDomPurifier(new JSDOM().window);
const { marked } = require("marked");
const { Article } = require("../models/Article")


makeMarkdown: () => {
    if (Article.article_content) {
        const sanitizedHtml = dompurify.sanitize(marked(article_content))
      return `${sanitizedHtml}`
    } 
    return sanitizedHtml
  }