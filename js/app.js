/**
 * Social Media Peak Times — Application Logic
 */

// ============ UTILITY FUNCTIONS ============

function getColorForValue(value, accentLight) {
  if (value <= 10) return accentLight + '0.08)';
  if (value <= 20) return accentLight + '0.15)';
  if (value <= 30) return accentLight + '0.22)';
  if (value <= 40) return accentLight + '0.30)';
  if (value <= 50) return accentLight + '0.40)';
  if (value <= 60) return accentLight + '0.50)';
  if (value <= 70) return accentLight + '0.60)';
  if (value <= 80) return accentLight + '0.72)';
  if (value <= 90) return accentLight + '0.85)';
  return accentLight + '1.0)';
}

function getLevelText(value) {
  if (value <= 20) return 'Very Low';
  if (value <= 40) return 'Low';
  if (value <= 55) return 'Moderate';
  if (value <= 70) return 'High';
  if (value <= 85) return 'Very High';
  return 'Peak';
}


// ============ RENDER PANEL ============

function renderPanel(platform) {
  const d = platformData[platform];
  const panel = document.getElementById(`panel-${platform}`);

  let html = '';

  // --- Stats Row ---
  html += `
  <div class="stats-row" style="--accent:${d.accent}">
    <div class="stat-card" style="--accent:${d.accent}">
      <div class="stat-label">🏆 Best Day</div>
      <div class="stat-value">${d.bestDay}</div>
      <div class="stat-sub">Highest overall engagement</div>
    </div>
    <div class="stat-card" style="--accent:${d.accent}">
      <div class="stat-label">⏰ Peak Hours</div>
      <div class="stat-value">${d.bestTime}</div>
      <div class="stat-sub">Maximum audience activity</div>
    </div>
    <div class="stat-card" style="--accent:${d.accent}">
      <div class="stat-label">🚀 Post By</div>
      <div class="stat-value">${d.bestUpload}</div>
      <div class="stat-sub">Optimal upload time</div>
    </div>
    <div class="stat-card" style="--accent:${d.accent}">
      <div class="stat-label">📊 Engagement Level</div>
      <div class="stat-value">${d.avgEngagement}</div>
      <div class="stat-sub">Creator benchmark</div>
    </div>
  </div>`;

  // --- Heatmap ---
  html += `
  <div class="heatmap-card" style="--accent:${d.accent}">
    <div class="heatmap-title">When Your Audience is on ${d.name}</div>
    <div class="heatmap-subtitle">Relative activity density · All times shown in your local timezone</div>
    <div class="heatmap-wrapper">
      <div class="heatmap-grid">
        <div></div>`;

  // Day headers
  DAYS.forEach(function(day) {
    html += '<div class="day-header">' + day + '</div>';
  });

  // Hour rows
  for (let h = 0; h < 24; h++) {
    html += '<div class="time-label">' + HOURS[h] + '</div>';
    for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
      const val = d.data[h][dayIdx];
      const color = getColorForValue(val, d.accentLight);
      const delay = (h * 7 + dayIdx) * 4;
      html += '<div class="cell" ' +
        'data-day="' + DAYS[dayIdx] + '" ' +
        'data-hour="' + HOURS[h] + '" ' +
        'data-value="' + val + '" ' +
        'data-accent="' + d.accent + '" ' +
        'style="background:' + color + '; --glow-cell:' + d.glowCell + '; animation-delay:' + delay + 'ms" ' +
        'onmouseenter="showTooltip(event,this)" ' +
        'onmouseleave="hideTooltip()"' +
        '></div>';
    }
  }

  html += '</div></div>';

  // Legend
  html += '<div class="legend"><span class="legend-label">Low</span><div class="legend-bar">';
  for (let i = 1; i <= 6; i++) {
    const opacity = (i * 0.16).toFixed(2);
    html += '<div class="lswatch" style="background:' + d.accentLight + opacity + ')"></div>';
  }
  html += '</div><span class="legend-label">Peak</span></div></div>';

  // --- Daily Summary Bar Chart ---
  html += `
  <div class="daily-summary-card">
    <div class="heatmap-title">Daily Engagement Overview</div>
    <div class="heatmap-subtitle">Average activity level by day of week</div>
    <div class="daily-bars">`;

  const maxDayVal = Math.max.apply(null, d.dailyAvg);
  DAYS.forEach(function(day, i) {
    const pct = (d.dailyAvg[i] / maxDayVal * 100);
    const barHeight = Math.max(pct, 8);
    html += `
    <div class="daily-bar-col">
      <div class="daily-bar" style="height:${barHeight}%; background: linear-gradient(180deg, ${d.accent}, ${d.accentLight}0.3)); animation-delay:${i * 80}ms">
        <span class="bar-val">${d.dailyAvg[i]}%</span>
      </div>
      <span class="daily-bar-label">${day}</span>
    </div>`;
  });

  html += '</div></div>';

  // --- Tips ---
  html += '<div class="tips-grid">';
  d.tips.forEach(function(tip) {
    html += `
    <div class="tip-card">
      <div class="tip-icon">${tip.icon}</div>
      <div class="tip-content">
        <h4>${tip.title}</h4>
        <p>${tip.text}</p>
      </div>
    </div>`;
  });
  html += '</div>';

  panel.innerHTML = html;
}


// ============ TAB SWITCHING ============

function switchTab(platform) {
  // Update buttons
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  document.querySelector('[data-platform="' + platform + '"]').classList.add('active');

  // Update panels
  document.querySelectorAll('.panel').forEach(function(p) {
    p.classList.remove('active');
  });
  var panel = document.getElementById('panel-' + platform);
  panel.classList.add('active');

  // Update background orb color
  var d = platformData[platform];
  document.querySelector('.orb:nth-child(1)').style.background = d.accent;
}


// ============ TOOLTIP ============

var tooltip = document.getElementById('tooltip');

function showTooltip(e, el) {
  var day = el.dataset.day;
  var hour = el.dataset.hour;
  var value = parseInt(el.dataset.value);
  var accent = el.dataset.accent;
  var level = getLevelText(value);

  tooltip.querySelector('.tt-day').textContent = day;
  tooltip.querySelector('.tt-time').textContent = hour;
  tooltip.querySelector('.tt-text').textContent = level + ' (' + value + '%)';
  tooltip.querySelector('.tt-dot').style.background = accent;

  var rect = el.getBoundingClientRect();
  var left = rect.left + rect.width / 2 - 70;
  var top = rect.top - 75;

  if (top < 10) top = rect.bottom + 10;
  if (left < 10) left = 10;
  if (left + 150 > window.innerWidth) left = window.innerWidth - 160;

  tooltip.style.left = left + 'px';
  tooltip.style.top = top + 'px';
  tooltip.classList.add('show');
}

function hideTooltip() {
  tooltip.classList.remove('show');
}


// ============ INITIALIZE ============

['youtube', 'instagram', 'tiktok', 'facebook'].forEach(function(p) {
  renderPanel(p);
});
