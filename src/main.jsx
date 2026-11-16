import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Galaxy from './components/Galaxy'
import AccordionGallery from './components/AccordionGallery'

const base = '/images/'

// 修改每个项目的 cover 字段即可自定义精选项目封面，gallery 字段控制详情页图集。
const projects = [
  {
    slug: 'nan-ao-art-center',
    number: '01',
    title: '南澳岛艺术中心',
    subtitle: '海岛文化 · 公共建筑',
    year: '2025',
    cover: `${base}南澳岛艺术中心-cover.jpg`,
    detailCover: `${base}南澳岛艺术中心.jpg`,
    gallery: [],
    accent: '潮汐、风与展陈路径',
    description: '以海岛聚落的日常尺度为起点，将艺术展陈、公共活动和滨水生活组织成一条连续的体验路径。'
  },
  {
    slug: 'campus-activity-center',
    number: '02',
    title: '大学生活动中心',
    subtitle: '校园更新 · 复合空间',
    year: '2024',
    cover: `${base}大学生活动中心-cover.png`,
    detailCover: `${base}大学生活动中心-1.jpg`,
    gallery: [`${base}大学生活动中心-2.jpg`],
    accent: '把日常活动组织成一条可漫游的路径',
    description: '在既有校园建筑的边界上重新编排开放空间，让学习、社交和活动共享一条有层次的公共动线。'
  },
  {
    slug: 'island-house',
    number: '03',
    title: '海岛住宅',
    subtitle: '居住研究 · 地景关系',
    year: '2024',
    cover: `${base}海岛住宅-cover.jpg`,
    detailCover: `${base}海岛住宅-1.png`,
    gallery: [`${base}海岛住宅-2.png`],
    accent: '以剖面回应光、风和海平面',
    description: '以连续的遮阳、庭院和开口回应海岛气候，让住宅成为介于室内生活与自然环境之间的缓冲层。'
  },
  {
    slug: 'vertical-community',
    number: '04',
    title: '高层建筑',
    subtitle: '城市综合体 · 垂直社区',
    year: '2024',
    cover: `${base}高层建筑-cover.png`,
    gallery: [`${base}高层建筑-II.png`, `${base}高层建筑-IV.png`, `${base}高层建筑-V.png`],
    accent: '将城市尺度压缩进一组连续的公共界面',
    description: '通过垂直公共空间、共享界面和连续的城市天际线，探索高层建筑中的邻里关系与步行体验。'
  },
  {
    slug: 'zhaoqing-rural-plan',
    number: '05',
    title: '肇庆乡村规划',
    subtitle: '乡村更新 · 场地研究',
    year: '2025',
    cover: `${base}肇庆乡村规划-cover.png`,
    detailCover: `${base}肇庆乡村规划.jpg`,
    gallery: [],
    accent: '从村落肌理、交通关系和日常活动开始规划',
    description: '从村落肌理、交通关系与日常活动出发，梳理空间问题并提出可持续推进的更新节点。'
  }
]

const strengths = [
  ['空间推演', '从场地分析到空间尺度，建立完整的设计逻辑。', '01'],
  ['视觉表达', '用图像、排版与叙事把复杂方案讲清楚。', '02'],
  ['交互原型', '用 Unity、Godot 和 C# 将空间想法变成可体验的原型。', '03'],
  ['团队协作', '善于整理信息、推进沟通，并把研究落实为成果。', '04']
]

function getProjectFromHash() {
  const slug = window.location.hash.replace('#project-', '')
  return projects.find((project) => project.slug === slug) || null
}

function ProjectDetail({ project }) {
  return (
    <section className="project-detail shell">
      <div className="detail-topline"><a className="detail-back" href="#projects">← 返回项目列表</a><span>{project.number} / 05</span></div>
      <div className="detail-heading">
        <div><p className="kicker">{project.subtitle}</p><h1>{project.title}</h1></div>
        <div className="detail-meta"><span>{project.year}</span><span>Architecture / Spatial study</span></div>
      </div>
      <div className="detail-hero"><img src={project.detailCover || project.cover} alt={`${project.title}完整展板`} /></div>
      <div className="detail-intro"><p className="detail-lead">{project.accent}</p><p>{project.description}</p></div>
      {project.gallery.length > 0 && <div className="detail-gallery">
        {project.gallery.map((image, index) => <figure key={`${image}-${index}`}><img src={image} alt={`${project.title}项目图 ${index + 1}`} /><figcaption>{String(index + 1).padStart(2, '0')} / {project.title}</figcaption></figure>)}
      </div>}
      <div className="detail-bottom"><a className="button button-dark" href="#projects">查看全部项目 <span>↓</span></a><a className="text-link" href="mailto:22423102937@qq.com">讨论一个项目 <span>↗</span></a></div>
    </section>
  )
}

function App() {
  const [isNavFloating, setIsNavFloating] = useState(false)
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsNavFloating(window.scrollY > window.innerHeight * 0.78)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const updateActiveProject = () => setActiveProject(getProjectFromHash())
    updateActiveProject()
    window.addEventListener('hashchange', updateActiveProject)
    return () => window.removeEventListener('hashchange', updateActiveProject)
  }, [])

  useEffect(() => {
    if (activeProject) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeProject])

  return (
    <main>
      <nav className={`nav shell${isNavFloating ? ' is-floating' : ''}`}>
        <a className="brand" href="#top" aria-label="回到首页">ZENG ZIHAN<span>/</span>PORTFOLIO</a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#strengths">Capabilities</a>
        </div>
        <a className="nav-contact" href="mailto:22423102937@qq.com">联系我 <span>↗</span></a>
      </nav>

      {activeProject ? <ProjectDetail project={activeProject} /> : <>
      <section className="hero shell" id="top">
        <div className="hero-reference-head">
          <span>建筑设计 ARCHITECTURE</span>
          <span>空间叙事 SPATIAL NARRATIVE</span>
          <span>互动体验 INTERACTION</span>
          <span>曾子函 / ZENG ZIHAN</span>
          <span>22423102937@qq.com</span>
        </div>
        <div className="hero-copy">
          <p className="kicker">Architecture · Interactive Space · 2026</p>
          <h1>把空间设计成<br /><em>可以被体验的故事。</em></h1>
          <p className="hero-lede">建筑学背景，专注空间组织、动线叙事与互动场景表达。正在寻找能让建筑与游戏世界彼此启发的团队。</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#projects">浏览精选项目 <span>↓</span></a>
            <a className="text-link" href="mailto:22423102937@qq.com">22423102937@qq.com <span>↗</span></a>
          </div>
        </div>
        <div className="hero-wordmark" aria-hidden="true">PORTFOLIO</div>
        <div className="hero-rule" aria-hidden="true"><span>space / narrative / interaction</span><span>portfolio 2026</span></div>
      </section>

      <section className="about shell section" id="about">
        <div className="section-head"><span className="section-index">01</span><h2>一个在建筑与互动之间工作的人</h2></div>
        <div className="about-grid">
          <div className="about-portrait"><img src={`${base}portrait.png`} alt="曾子函证件照" /><span>Shantou University<br />Architecture / 2023—now</span></div>
          <div className="about-copy">
            <p className="lead">建筑训练让我从场地、尺度和动线出发；游戏研究则让我开始关注人在空间里的感受、选择与反馈。</p>
            <p>我目前就读于汕头大学建筑学专业，GPA 3.78，专业排名前 10%。曾参与虚拟游戏建筑空间设计研究，围绕 VR 虚拟空间、具身感与晕动症展开实验，并参与乡村规划实习，完成场地调研、空间规划与成果整理。</p>
            <div className="about-meta">
              <div><span>Current base</span><strong>Shenzhen / China</strong></div>
              <div><span>Available from</span><strong>2027.01.12</strong></div>
              <div><span>Contact</span><strong>15603116676</strong></div>
            </div>
          </div>
          <div className="about-stats">
            <div><strong>3.78</strong><span>GPA</span></div>
            <div><strong>TOP 10%</strong><span>专业排名</span></div>
            <div><strong>11</strong><span>村落调研</span></div>
            <div><strong>2</strong><span>游戏引擎</span></div>
          </div>
        </div>
      </section>

      <section className="projects shell section" id="projects">
        <div className="section-head"><span className="section-index">02</span><h2>精选项目</h2><p>每个项目都从一个具体的空间问题开始。</p></div>
        <AccordionGallery
          items={projects.map((project) => ({
            image: project.cover,
            label: `${project.number} / ${project.title}`,
            alt: `${project.title}项目封面`,
            link: `#project-${project.slug}`
          }))}
          defaultIndex={0}
          expandRatio={0.52}
          trigger="hover"
          height={500}
          radius={0}
          gap={8}
          grayscale={false}
          overlayColor="#000000"
        />
        <div className="project-gallery-note">悬停查看项目 · 点击展开的图像进入详情</div>
      </section>

      <section className="strengths shell section" id="strengths">
        <div className="section-head"><span className="section-index">03</span><h2>我能带来的能力</h2></div>
        <div className="strengths-grid">
          {strengths.map(([title, desc, number]) => <div className="strength-card" key={number}><span>{number}</span><h3>{title}</h3><p>{desc}</p></div>)}
        </div>
      </section>

      <section className="closing shell" id="contact">
        <div className="closing-galaxy" aria-hidden="true"><Galaxy density={1} glowIntensity={0.3} flareIntensity={1} starSpeed={0.4} mouseRepulsion clickWarp speed={0.25} rotationSpeed={0.06} /></div>
        <div className="closing-top"><span>04 / LET'S WORK TOGETHER</span><span>Based in Shenzhen, open to new worlds</span></div>
        <div className="closing-main"><h2>期待加入您的团队，<br /><em>我会保持热爱，<br />持续学习与创造。</em></h2><a className="button button-light" href="mailto:22423102937@qq.com">发一封邮件 <span>↗</span></a></div>
        <div className="closing-footer"><span>© 2026 Zeng Zihan</span><div><a href="mailto:22423102937@qq.com">Email</a><a href="tel:15603116676">Phone</a><a href="#top">Back to top ↑</a></div></div>
      </section>
      </>}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)

