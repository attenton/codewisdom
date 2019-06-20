<template>
    <div id='neo4jd3' v-loading="loading">
    </div>
</template>

<script>
import Neo4jD3 from '../static/neo4jd3'
import axios from 'axios'

export default {
  name: 'showElementsGraph',
  data () {
    return {
      loading: false,
      nodeData: {},
      neo4jd3: null,
      nodes: [],
      edges: [],
      id: null,
      startData: {
        'nodes': [
          {
            'id': 316472,
            'labels': [
              'Software Concept'
            ],
            'majority_properties': {
              'Commons category': [
                'GPL'
              ],
              'SPDX ID': [
                'GPL-2.0-only',
                'GPL-2.0'
              ],
              'description': 'previous version of the GNU GPL (version 2), free software license with copyleft',
              'full work available at': [
                'https://opensource.org/licenses/GPL-2.0',
                'https://ja.osdn.net/projects/opensource/wiki/licenses%2FGNU_General_Public_License',
                'https://www.gnu.org/licenses/old-licenses/gpl-2.0.html'
              ],
              'name': 'GPLv2',
              'official website': [
                'https://www.gnu.org/licenses/old-licenses/gpl-2.0.html'
              ],
              'publication date': [
                '+1991-06-00T00:00:00Z'
              ],
              'short name': [
                'GNU GPL v2'
              ],
              'software version': [
                '2.0'
              ],
              'wd item id': 'Q10513450'
            },
            'name': 'GPLv2',
            'properties': {
              'Commons category': [
                'GPL'
              ],
              'SPDX ID': [
                'GPL-2.0-only',
                'GPL-2.0'
              ],
              'aliases_da': [
                'GNU General Public License',
                'GPL2',
                'GPL 2'
              ],
              'aliases_de': [
                'GPL2',
                'GPL 2',
                'GNU GPLv2',
                'GNU General Public License, Version 2',
                'GPLv2',
                'GPL v2',
                'GNU General Public License 2.0'
              ],
              'aliases_en': [
                'GNU GPLv2',
                'GNU General Public License, version 2',
                'GPLv2',
                'GNU General Public License v2.0',
                'GPL-2.0'
              ],
              'aliases_fo': [
                'GNU General Public License',
                'GPL2',
                'GPL 2'
              ],
              'aliases_fr': [
                'Licence publique générale GNU, version 2',
                'GNU GPLv2',
                'GPL-2.0'
              ],
              'aliases_hu': [
                'GPLv2'
              ],
              'aliases_id': [
                'GNU GPLv2',
                'Lisensi umum GNU, versi 2',
                'GPLv2',
                'Lisensi umum GNU, versi 2.0'
              ],
              'aliases_is': [
                'GNU General Public License',
                'GPL2',
                'GPL 2'
              ],
              'aliases_it': [
                'GPL v2',
                'GNU GPLv2',
                'GNU GPL versione 2',
                'GNU General Public License v2',
                'GPL 2',
                'GPLv2'
              ],
              'aliases_ja': [
                'GPLバージョン2',
                'GPLバージョン2.0'
              ],
              'aliases_nb': [
                'GNU General Public License',
                'GPL2',
                'GPL 2'
              ],
              'aliases_nn': [
                'GNU General Public License',
                'GPL2',
                'GPL 2'
              ],
              'aliases_se': [
                'GNU General Public License',
                'GPL2',
                'GPL 2'
              ],
              'aliases_sv': [
                'GNU General Public License',
                'GPL2',
                'GPL 2'
              ],
              'aliases_zh-hans': [
                'GPLv2',
                'GNU通用公共许可协议第2版'
              ],
              'aliases_zh-hant': [
                'GPLv2',
                'GNU通用公共授權條款第2版'
              ],
              'description': 'previous version of the GNU GPL (version 2), free software license with copyleft',
              'descriptions_de': 'Freie-Software-Lizenz mit Copyleft in Version 2.0',
              'descriptions_en': 'previous version of the GNU GPL (version 2), free software license with copyleft',
              'descriptions_eo': 'dua versio de Ĝenerala Publika Permesilo de GNU',
              'descriptions_fr': 'version précédente de la licence publique générale GNU (version 2), licence de logiciel libre avec copyleft',
              'descriptions_fy': 'twadde ferzje fan GPL (GNU)',
              'descriptions_he': 'גרסה ישנה של רישיון GNU GPL',
              'descriptions_hu': 'a "GNU General Public License" (GPL) második verziója',
              'descriptions_id': 'versi sebelumnya GNU GPL (versi 2), lisensi perangkat lunak bebas dengan copyleft',
              'descriptions_it': 'seconda versione della "GNU General Public License" (GPL)',
              'descriptions_ko': 'GNU 일반 공중 사용 허가서의 두 번째 버전',
              'descriptions_nl': 'tweede versie van GPL (GNU)',
              'descriptions_ru': 'Вторая версия лицензии GNU GPL',
              'full work available at': [
                'https://opensource.org/licenses/GPL-2.0',
                'https://ja.osdn.net/projects/opensource/wiki/licenses%2FGNU_General_Public_License',
                'https://www.gnu.org/licenses/old-licenses/gpl-2.0.html'
              ],
              'labels_be-tarask': 'GPLv2',
              'labels_ca': 'GPLv2',
              'labels_cs': 'GPLv2',
              'labels_da': 'GPLv2',
              'labels_de': 'GPL-2.0',
              'labels_en': 'GPLv2',
              'labels_eo': 'GPLv2',
              'labels_es': 'GPLv2',
              'labels_fi': 'GPLv2',
              'labels_fo': 'GPLv2',
              'labels_fr': 'GPLv2',
              'labels_fy': 'GPLv2',
              'labels_he': 'GPL-2.0',
              'labels_hu': 'GPL-2.0',
              'labels_hy': 'GPLv2',
              'labels_id': 'GPL-2.0',
              'labels_is': 'GPLv2',
              'labels_it': 'GNU GPL v2',
              'labels_ja': 'GPL 2.0',
              'labels_ko': 'GPLv2',
              'labels_li': 'GPLv2',
              'labels_mk': 'ОЈЛ 2',
              'labels_ml': 'ജി.പി.എൽ.വി2',
              'labels_nb': 'GPLv2',
              'labels_nl': 'GPLv2',
              'labels_nn': 'GPLv2',
              'labels_pl': 'GPLv2',
              'labels_ru': 'GNU GPL 2',
              'labels_sco': 'GPLv2',
              'labels_se': 'GPLv2',
              'labels_sk': 'GPLv2',
              'labels_sl': 'GPLv2',
              'labels_sr': 'ГНУ ОЈЛ 2',
              'labels_sr-ec': 'ГНУ ОЈЛ 2',
              'labels_sr-el': 'GNU OJL 2',
              'labels_sv': 'GPLv2',
              'labels_vi': 'GPLv2',
              'labels_zh': 'GPLv2',
              'labels_zh-hans': 'GPL-2.0',
              'labels_zh-hant': 'GPL-2.0',
              'name': 'GPLv2',
              'official website': [
                'https://www.gnu.org/licenses/old-licenses/gpl-2.0.html'
              ],
              'publication date': [
                '+1991-06-00T00:00:00Z'
              ],
              'short name': [
                'GNU GPL v2'
              ],
              'site:enwiki': 'https://en.wikipedia.org/wiki/GPLv2',
              'site:frwiki': 'https://fr.wikipedia.org/wiki/GPLv2',
              'site:itwiki': 'https://it.wikipedia.org/wiki/GNU_GPL_v2',
              'site:itwikisource': 'https://it.wikisource.org/wiki/Licenza_pubblica_generica_(GPLv2)_del_progetto_GNU',
              'site:ruwiki': 'https://ru.wikipedia.org/wiki/GNU_GPL_2',
              'software version': [
                '2.0'
              ],
              'wd item id': 'Q10513450'
            }
          },
          {
            'id': 88740,
            'labels': [
              'Software Concept'
            ],
            'majority_properties': {
              'description': 'computer program for editing HTML',
              'name': 'HTML editor',
              'wd item id': 'Q726761'
            },
            'name': 'HTML editor',
            'properties': {
              'Freebase ID': [
                '/m/0161z0'
              ],
              'aliases_ar': [
                'محرر اتش تي ام ال'
              ],
              'aliases_ca': [
                'Editors web'
              ],
              'aliases_cs': [
                'Editor HTML'
              ],
              'aliases_da': [
                'HTML-editor'
              ],
              'aliases_es': [
                'Editor de HTML',
                'Editor HTML',
                'Editor web',
                'Editor de paginas web'
              ],
              'aliases_fr': [
                'Éditeur Web',
                'Editeur HTML'
              ],
              'aliases_it': [
                'webeditor',
                'web editor'
              ],
              'aliases_ja': [
                'Webオーサリングソフト',
                'HTMLエディタ',
                'ウェブオーサリングツール'
              ],
              'aliases_ko': [
                'HTML 에디터',
                '웹 에디터',
                '웹에디터',
                '웹 편집기'
              ],
              'aliases_ky': [
                'HTML'
              ],
              'aliases_pl': [
                'Edytory HTML'
              ],
              'aliases_pt': [
                'Editor Web',
                'Editor de Websites',
                'Editores HTML'
              ],
              'aliases_ru': [
                'HTML редактор',
                'HTML-редактор',
                'Веб-редактор',
                'Редактор веб'
              ],
              'aliases_sv': [
                'HTML-redigerare',
                'Webbeditor'
              ],
              'aliases_uk': [
                'HTML-редактор'
              ],
              'description': 'computer program for editing HTML',
              'descriptions_de': 'Anwendungssoftware, mit der man Webseiten mit HTML-Code erstellen und bearbeiten kann',
              'descriptions_en': 'computer program for editing HTML',
              'labels_ar': 'محرر إتش تي إم إل',
              'labels_bg': 'HTML редактор',
              'labels_bn': 'এইচটিএমএল সম্পাদক',
              'labels_ca': 'editor web',
              'labels_cs': 'HTML editor',
              'labels_da': 'HTML-redigeringsværktøj',
              'labels_de': 'HTML-Editor',
              'labels_en': 'HTML editor',
              'labels_eo': 'redaktilo de retpaĝoj',
              'labels_es': 'Editor de páginas web',
              'labels_et': 'HTML-redaktor',
              'labels_fa': 'ویرایش\u200cگر اچ\u200cتی\u200cام\u200cال',
              'labels_fi': 'HTML-editori',
              'labels_fr': 'éditeur HTML',
              'labels_hi': 'एचटीएमएल एडिटर',
              'labels_hu': 'HTML-szerkesztő programok',
              'labels_it': 'editor HTML',
              'labels_ja': 'Webオーサリングツール',
              'labels_kn': 'ಎಚ್ ಟಿಎಮ್ ಎಲ್ ಎಡಿಟರ್',
              'labels_ko': 'HTML 편집기',
              'labels_ky': 'HTML-Редактору',
              'labels_nl': 'HTML-editor',
              'labels_pl': 'Edytor HTML',
              'labels_pt': 'Editor HTML',
              'labels_ru': 'Редактор HTML',
              'labels_sv': 'HTML-redigeringsprogram',
              'labels_uk': 'Редактор HTML',
              'labels_vi': 'Trình biên tập HTML',
              'labels_zh': 'HTML编辑器',
              'labels_zh-hans': 'HTML编辑器',
              'labels_zh-hant': 'HTML編輯器',
              'labels_zh-hk': 'HTML編輯器',
              'name': 'HTML editor',
              'site:arwiki': 'https://ar.wikipedia.org/wiki/%D9%85%D8%AD%D8%B1%D8%B1_%D8%A5%D8%AA%D8%B4_%D8%AA%D9%8A_%D8%A5%D9%85_%D8%A5%D9%84',
              'site:bgwiki': 'https://bg.wikipedia.org/wiki/HTML_%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%BE%D1%80',
              'site:cawiki': 'https://ca.wikipedia.org/wiki/Editor_web',
              'site:cswiki': 'https://cs.wikipedia.org/wiki/HTML_editor',
              'site:dawiki': 'https://da.wikipedia.org/wiki/HTML-redigeringsv%C3%A6rkt%C3%B8j',
              'site:dewiki': 'https://de.wikipedia.org/wiki/HTML-Editor',
              'site:enwiki': 'https://en.wikipedia.org/wiki/HTML_editor',
              'site:eswiki': 'https://es.wikipedia.org/wiki/Editor_de_p%C3%A1ginas_web',
              'site:etwiki': 'https://et.wikipedia.org/wiki/HTML-redaktor',
              'site:fawiki': 'https://fa.wikipedia.org/wiki/%D9%88%DB%8C%D8%B1%D8%A7%DB%8C%D8%B4%E2%80%8C%DA%AF%D8%B1_%D8%A7%DA%86%E2%80%8C%D8%AA%DB%8C%E2%80%8C%D8%A7%D9%85%E2%80%8C%D8%A7%D9%84',
              'site:fiwiki': 'https://fi.wikipedia.org/wiki/HTML-editori',
              'site:frwiki': 'https://fr.wikipedia.org/wiki/%C3%89diteur_HTML',
              'site:hiwiki': 'https://hi.wikipedia.org/wiki/%E0%A4%8F%E0%A4%9A%E0%A4%9F%E0%A5%80%E0%A4%8F%E0%A4%AE%E0%A4%8F%E0%A4%B2_%E0%A4%8F%E0%A4%A1%E0%A4%BF%E0%A4%9F%E0%A4%B0',
              'site:huwiki': 'https://hu.wikipedia.org/wiki/HTML-szerkeszt%C5%91_programok',
              'site:itwiki': 'https://it.wikipedia.org/wiki/Editor_web',
              'site:jawiki': 'https://ja.wikipedia.org/wiki/Web%E3%82%AA%E3%83%BC%E3%82%B5%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%84%E3%83%BC%E3%83%AB',
              'site:knwiki': 'https://kn.wikipedia.org/wiki/%E0%B2%8E%E0%B2%9A%E0%B3%8D%E2%80%8C%E0%B2%9F%E0%B2%BF%E0%B2%8E%E0%B2%AE%E0%B3%8D%E2%80%8C%E0%B2%8E%E0%B2%B2%E0%B3%8D_%E0%B2%8E%E0%B2%A1%E0%B2%BF%E0%B2%9F%E0%B2%B0%E0%B3%8D',
              'site:kowiki': 'https://ko.wikipedia.org/wiki/HTML_%ED%8E%B8%EC%A7%91%EA%B8%B0',
              'site:kywiki': 'https://ky.wikipedia.org/wiki/HTML-%D0%A0%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%BE%D1%80%D1%83',
              'site:nlwiki': 'https://nl.wikipedia.org/wiki/HTML-editor',
              'site:plwiki': 'https://pl.wikipedia.org/wiki/Edytor_HTML',
              'site:ptwiki': 'https://pt.wikipedia.org/wiki/Editor_HTML',
              'site:ruwiki': 'https://ru.wikipedia.org/wiki/%D0%A0%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%BE%D1%80_HTML',
              'site:svwiki': 'https://sv.wikipedia.org/wiki/HTML-redigeringsprogram',
              'site:ukwiki': 'https://uk.wikipedia.org/wiki/%D0%A0%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%BE%D1%80_HTML',
              'site:viwiki': 'https://vi.wikipedia.org/wiki/Tr%C3%ACnh_bi%C3%AAn_t%E1%BA%ADp_HTML',
              'site:zhwiki': 'https://zh.wikipedia.org/wiki/HTML%E7%BC%96%E8%BE%91%E5%99%A8',
              'wd item id': 'Q726761'
            }
          },
          {
            'id': 94002,
            'labels': [
              'Software Concept'
            ],
            'majority_properties': {
              'Commons category': [
                'KompoZer'
              ],
              'Commons gallery': [
                'KompoZer'
              ],
              'Quora topic ID': [
                'Kompozer'
              ],
              'SourceForge project': [
                'kompozer'
              ],
              'description': 'WYSIWYG HTML editor',
              'image': [
                'KompoZer nahled.png'
              ],
              'name': 'KompoZer',
              'official website': [
                'http://www.kompozer.net'
              ],
              'source code repository': [
                'http://hg.code.sf.net/p/kompozer/code'
              ],
              'wd item id': 'Q161834'
            },
            'name': 'KompoZer',
            'properties': {
              'Commons category': [
                'KompoZer'
              ],
              'Commons gallery': [
                'KompoZer'
              ],
              'Freebase ID': [
                '/m/02pn9pd'
              ],
              'Quora topic ID': [
                'Kompozer'
              ],
              'SourceForge project': [
                'kompozer'
              ],
              'aliases_ar': [
                'كمبو زير',
                'KompoZer'
              ],
              'aliases_it': [
                'Mozilla kompozer'
              ],
              'description': 'WYSIWYG HTML editor',
              'descriptions_en': 'WYSIWYG HTML editor',
              'descriptions_fr': 'logiciel informatique',
              'image': [
                'KompoZer nahled.png'
              ],
              'labels_ar': 'كمبوزر',
              'labels_cs': 'KompoZer',
              'labels_de': 'KompoZer',
              'labels_en': 'KompoZer',
              'labels_eo': 'KompoZer',
              'labels_es': 'KompoZer',
              'labels_fr': 'KompoZer',
              'labels_hsb': 'KompoZer',
              'labels_it': 'KompoZer',
              'labels_ja': 'KompoZer',
              'labels_ms': 'KompoZer',
              'labels_nl': 'KompoZer',
              'labels_pt': 'KompoZer',
              'labels_ru': 'KompoZer',
              'labels_tr': 'Kompozer',
              'labels_uk': 'KompoZer',
              'labels_vi': 'KompoZer',
              'labels_zh': 'KompoZer',
              'labels_zh-cn': 'KompoZer',
              'labels_zh-hans': 'KompoZer',
              'labels_zh-hant': 'KompoZer',
              'labels_zh-hk': 'KompoZer',
              'labels_zh-sg': 'KompoZer',
              'labels_zh-tw': 'KompoZer',
              'name': 'KompoZer',
              'official website': [
                'http://www.kompozer.net'
              ],
              'site:arwiki': 'https://ar.wikipedia.org/wiki/%D9%83%D9%85%D8%A8%D9%88%D8%B2%D8%B1',
              'site:commonswiki': 'https://commons.wikimedia.org/wiki/KompoZer',
              'site:cswiki': 'https://cs.wikipedia.org/wiki/KompoZer',
              'site:dewiki': 'https://de.wikipedia.org/wiki/KompoZer',
              'site:enwiki': 'https://en.wikipedia.org/wiki/KompoZer',
              'site:eowiki': 'https://eo.wikipedia.org/wiki/KompoZer',
              'site:eswiki': 'https://es.wikipedia.org/wiki/KompoZer',
              'site:frwiki': 'https://fr.wikipedia.org/wiki/KompoZer',
              'site:hsbwiki': 'https://hsb.wikipedia.org/wiki/KompoZer',
              'site:itwiki': 'https://it.wikipedia.org/wiki/KompoZer',
              'site:jawiki': 'https://ja.wikipedia.org/wiki/KompoZer',
              'site:mswiki': 'https://ms.wikipedia.org/wiki/KompoZer',
              'site:ptwiki': 'https://pt.wikipedia.org/wiki/KompoZer',
              'site:ruwiki': 'https://ru.wikipedia.org/wiki/KompoZer',
              'site:trwiki': 'https://tr.wikipedia.org/wiki/KompoZer',
              'site:ukwiki': 'https://uk.wikipedia.org/wiki/KompoZer',
              'site:viwiki': 'https://vi.wikipedia.org/wiki/KompoZer',
              'site:zhwiki': 'https://zh.wikipedia.org/wiki/KompoZer',
              'source code repository': [
                'http://hg.code.sf.net/p/kompozer/code'
              ],
              'wd item id': 'Q161834'
            }
          }
        ],
        'relationships': [
          {
            'end_id': 316472,
            'id': 273605,
            'name': 'license',
            'start_id': 94002
          },
          {
            'end_id': 88740,
            'id': 143489,
            'name': 'instance of',
            'start_id': 94002
          }
        ]
      }
    }
  },
  methods: {
    init () {
      let _this = this
      this.neo4jd3 = new Neo4jD3('#neo4jd3', {
        D3Data: this.startData,
        icons: {
        },
        images: {
        },
        minCollision: 60,
        nodeRadius: 25,
        onNodeDoubleClick: function (node) {
          _this.get_expand_node(node.id)
        },
        onRelationshipDoubleClick: function (relationship) {
          console.log('double click on relationship: ' + JSON.stringify(relationship))
        },
        zoomFit: true
      })
    },
    // dataUpdate (dataNode) {
    //   this.neo4jd3.updateWithD3Data(this.nodeData)
    // },
    // data2D3Data (data) {
    //   let oriTerms = data['terms']
    //   let oriRelations = data['relations']
    //   let nodes = []
    //   let relations = []
    //   oriTerms.forEach(function (term, index) {
    //     nodes.push({'id': index, 'labels': [term]})
    //   })
    //   oriRelations.forEach(function (relation, index) {
    //     relations.push({'id': index, 'type': relation[1], 'startNode': relation[0], 'endNode': relation[2], 'linknum': 1})
    //   })
    //   return {
    //     'nodes': nodes,
    //     'relationships': relations
    //   }
    // },
    // eslint-disable-next-line no-undef
    get_expand_node (id) {
      axios
        .post('http://bigcode.fudan.edu.cn/kg-debug/expandNode/', {id: id})
        .then(response => {
          console.log(response)
          response.data.relations.forEach((relation) => {
            let edge = {}
            edge.end_id = relation.end_id
            edge.start_id = relation.start_id
            edge.target = relation.end_id
            edge.source = relation.start_id
            edge.id = relation.id
            edge.type = relation.name
            edge.properties = {}
            this.$set(this.edges, this.edges.length, edge)
          })
          response.data.nodes.forEach((relatedNode) => {
            // let node = relatedNode.nodes
            this.$set(this.nodes, this.nodes.length, relatedNode)
          })
          // this.neo4jd3.cleanGraph()
          console.log('nodes')
          console.log(this.nodes)
          console.log('edges')
          console.log(this.edges)
          this.startData = {'nodes': this.nodes, 'relationships': this.edges}
          // this.neo4jd3.updateWithD3Data(this.startData)
          // this.init()
          this.loading = false
          this.neo4jd3.updateWithD3Data({'nodes': this.nodes, 'relationships': this.edges})
        })
        .catch(error => console.log(error))
    }
  },
  mounted () {
    this.init()
    // this.get_expand_node(this.id)
  },
  created () {
    this.id = this.$route.params.id
  },
  watch: {
    '$route': function () {
      this.id = this.$route.params.id
    }
  }
}
</script>

<style scoped>
#neo4jd3{
  height: 500px;
}
.neo4jd3 {
  height: 500px;
  overflow: hidden;
}
* {
  margin: 0px;
  padding: 0px;
}

body {
  font: 13px 'Helvetica Neue',Helvetica,Arial,sans-serif;
  font-size: 20px;
}

.neo4jd3-graph {
  border: 1px solid #ddd;
  border-radius: 5px;
}

.neo4jd3-info {
  font-size: 16px;
  padding: 10px;
  position: absolute;
}
.neo4jd3-info a {
  border: 1px solid;
  display: inline-block;
  font-size: 14px;
  line-height: 1.428571429;
  margin-left: 5px;
  margin-top: 5px;
  padding: 6px 12px;
}
.neo4jd3-info a.class {
  color: white;
}
.neo4jd3-info a.property {
  background-color: #fff;
  border-color: #ccc;
  color: #333;
}
.neo4jd3-info a.btn {
  margin-left: 5px;
  margin-top: 5px;
  opacity: 1;
}
.neo4jd3-info a.info {
  background-color: #a5abb6;
  border: 1px solid #9aa1ac;
  color: white;
}

.node.node-highlighted .ring {
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=50)';
  filter: alpha(opacity=50);
  opacity: .5;
  stroke: #888;
  stroke-width: 12px;
}
.node .outline {
  cursor: pointer;
  fill: #a5abb6;
  pointer-events: all;
  stroke: #9aa1ac;
  stroke-width: 2px;
}
.node .ring {
  fill: none;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
  filter: alpha(opacity=0);
  opacity: 0;
  stroke: #6ac6ff;
  stroke-width: 8px;
}
.node .text.icon {
  font-family: FontAwesome;
}

.node.selected .ring,
.node:hover .ring {
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)';
  filter: alpha(opacity=30);
  opacity: .3;
}

.relationship {
  cursor: default;
}
.relationship line {
  stroke: #aaa;
}
.relationship .outline {
  cursor: default;
}
.relationship .overlay {
  cursor: default;
  fill: #6ac6ff;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
  filter: alpha(opacity=0);
  opacity: 0;
}
.relationship text {
  cursor: default;
}

.relationship.selected .overlay,
.relationship:hover .overlay {
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)';
  filter: alpha(opacity=30);
  opacity: .3;
}

svg {
  cursor: move;
}
</style>
