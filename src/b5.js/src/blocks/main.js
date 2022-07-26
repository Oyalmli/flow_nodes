class _FlowBlocks {
  constructor() {
    this.custom = {}
    this.library = this.__proto__.library
    this.original = this.__proto__ // ? Is it dangerous?
  }
}

_FlowBlocks.prototype.library = {}

/* --------------------------------- Custom --------------------------------- */

_FlowBlocks.prototype.createCustom = function (
  name,
  type,
  kind,
  inputNodesDetails,
  outputNodesDetails,
  run
) {
  if (this.custom[name]) delete this.custom[name]

  this.custom[name] = {
    text: name,
    type: type,
    kind: kind,
    source: 'custom',
    description: 'Customized block from ' + type + '.',
    inputNodes: inputNodesDetails,
    outputNodes: outputNodesDetails,
    run: function (...args) {
      return run(...args)
    },
  }
}

_FlowBlocks.prototype.deleteCustom = function (name) {
  if (this.custom[name]) delete this.custom[name]
}

_FlowBlocks.prototype.cleanCustom = function () {
  // Delete all custom blocks
  for (let c in this.custom) delete this.custom[c]
}

/* --------------------------------- Source --------------------------------- */

_FlowBlocks.prototype.getSource = function (name) {
  for (let i in this) {
    if (this[i].hasOwnProperty(name)) {
      return i
    }
  }
  return null
}

_FlowBlocks.prototype.getBlock = function (name) {
  const s = this.getSource(name)
  if (!s) return null
  return this[s][name]
}

/* -------------------------------- Get Names ------------------------------- */

_FlowBlocks.prototype.getOriginalNames = function () {
  const o = this.original
  return Object.keys(this.original).reduce((result, key) => {
    if (typeof o[key] === 'object' && key !== 'library') {
      result.push(key)
    }
    return result
  }, [])
}

_FlowBlocks.prototype.getLibraryNames = function () {
  return Object.keys(this.library)
}

_FlowBlocks.prototype.getAllBlockNames = function () {
  return [
    ...this.getLibraryNames(),
    ...this.getOriginalNames(),
    ...Object.keys(this.custom),
  ]
}

export default _FlowBlocks
