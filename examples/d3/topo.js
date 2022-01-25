let {
  select,
  create,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
  forceCollide,
  forceCenter,
} = d3;

const simulation = forceSimulation(nodes)
  .force(
    'link',
    forceLink(links).id(d => d.id)
  )
  .force('collide', forceCollide().radius(80))
  .force('x', forceX(0))
  .force('y', forceY(0));

const drag = simulation => {

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}

const svg = select('svg');
const width = 800;
const height = 500;
const iconScale = 0.5
const iconWidth = 195 * iconScale
const iconHeight = 152 * iconScale

svg
  .attr('viewBox', [-width / 2, -height / 2, width, height])

svg
  .append('defs')
  .append('marker')
  .attr('id', 'arrow')
  .attr('viewBox', '0 0 10 10')
  .attr('refX', 5)
  .attr('refY', 5)
  .attr('markerWidth', 10)
  .attr('markerHeight', 10)
  .attr('markerUnits', 'strokeWidth')
  .attr('orient', 'auto')
  .append('path')
  .attr('fill', '#19ADE0')
  .attr('d', 'M 0 0 L 10 5 L 0 10 z');

const link = svg
  .append('g')
  .attr('fill', 'none')
  .attr('stroke-width', 1)
  .attr('stroke', '#19ADE0')
  .attr('marker-end', 'url(#arrow)')
  .selectAll('path')
  .data(links)
  .join('path');

const node = svg
  .append('g')
  .attr('fill', 'currentColor')
  .selectAll('g')
  .data(nodes)
  .join('g')
  .call(drag(simulation));

node
  .append('image')
  .data(nodes)
  .attr(
    'href',
    d => d.warning ? './images/node_warning.png' : './images/node.png'
  )
  .attr('width', iconWidth)
  .attr('height', iconHeight)
  .attr('x', -iconWidth / 2)
  .attr('y', -iconHeight / 2)
  .on('click', () => {
    alert('hello');
  });

node.append('text')
  .attr('fill', 'white')
  .attr('font-size', '10')
  .attr('dy', iconHeight / 2)
  .data(nodes).text(function(d) {
    return '核心联机';
  });

function linkArc(d) {
  const sourceX = d.source.x
  const sourceY = d.source.y

  const targetX = d.target.x + (sourceX - d.target.x) * 0.3
  const targetY = d.target.y + (sourceY - d.target.y) * 0.3

  const r = Math.hypot(
    targetX - sourceY,
    targetY - sourceY
  );
  return `
    M${sourceX},${sourceY}
    A${r},${r} 0 0,1 ${targetX},${targetY}
  `;
}

simulation.on('tick', () => {
  link.attr('d', linkArc);
  node.attr('transform', (d) => `translate(${d.x},${d.y})`);
});
