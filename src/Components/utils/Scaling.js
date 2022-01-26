import * as d3 from "d3";

export const getScale = (data, header, rangeStart, rangeEnd = null, scale = 'linear', pad = null) => {
  var scaling
  var values

  if (scale === "linear")
    scaling = d3.scaleLinear()
  else if (scale === "band")
    scaling = d3.scaleBand()
  
  values = data.map(d => d[header])

  //RANGE
  if (rangeEnd === null) 
    scaling = scaling.range(rangeStart)
  else 
    scaling = scaling.range([rangeStart, rangeEnd])

  //DOMAIN
  if (scale === "linear")
    scaling = scaling.domain([0, d3.max(values)])
  else if (scale === "band")
    scaling = scaling.domain(values)

  if (scale === "band")
    scaling = scaling.padding(.14)
  return scaling
}

export const getOldScale = (data, rangeStart, rangeEnd = null, useKey = false, scale = 'linear', pad = null) => {
  var scaling
  var values

  if (scale === "linear")
    scaling = d3.scaleLinear()
  else if (scale === "band")
    scaling = d3.scaleBand()
  
  if (useKey)
    values = data.map(d => d.key)
  else
    values = data.map(d => d.value)

  //RANGE
  if (rangeEnd === null) 
    scaling = scaling.range(rangeStart)
  else 
    scaling = scaling.range([rangeStart, rangeEnd])

  //DOMAIN
  if (scale === "linear")
    scaling = scaling.domain([0, d3.max(values)])
  else if (scale === "band")
    scaling = scaling.domain(values)

  if (pad)
    scaling = scaling.padding(pad)
  return scaling
}