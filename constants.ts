import { Database } from './types';

export const PROXIMUS_CHECK_URL = "https://www.proximus.be/fr/id_cr_fiber/particuliers/abonnements-internet-pour-tous/la-fibre-optique-debarque-chez-vous.html";

// Items to hide from the Franchisee view line-item breakdown
export const HIDDEN_ITEM_TYPES = ['CPE', 'Security License', 'Adjustment', 'SLA'];

export const DB: Database = {
  "meta": {
    "source_document": "Quote Heytens Centrale-102420-20251126.pdf",
    "source_note": "Extracted from Proximus Explore-SDWAN estimate 102420 dated 26/11/2025.",
    "currency": "EUR",
    "generated_at": "2025-12-15T07:56:57.699483Z"
  },
  "profiles": [
    {
      "profile_id": "dual_copper",
      "profile_name": "DUAL copper",
      "sites": 1,
      "subtotal_one_time": 300.0,
      "subtotal_monthly": 198.41
    },
    {
      "profile_id": "tempo_mobile",
      "profile_name": "Connectivité mobile temporaire",
      "sites": 1,
      "subtotal_one_time": 150.0,
      "subtotal_monthly": 150.54
    },
    {
      "profile_id": "dc",
      "profile_name": "Fibre dédiée 200M symétrique",
      "sites": 1,
      "subtotal_one_time": 450.0,
      "subtotal_monthly": 511.39
    },
    {
      "profile_id": "gpon_500_100",
      "profile_name": "GPON Fibre 100M upload / 500M download",
      "sites": 1,
      "subtotal_one_time": 150.0,
      "subtotal_monthly": 387.35
    },
    {
      "profile_id": "external_connectivity",
      "profile_name": "External connectivity",
      "sites": 1,
      "subtotal_one_time": 0.0,
      "subtotal_monthly": 63.45
    },
    {
      "profile_id": "hq",
      "profile_name": "Fibre dédiée asymétrique 50M upload / 350M download",
      "sites": 1,
      "subtotal_one_time": 450.0,
      "subtotal_monthly": 516.26
    },
    {
      "profile_id": "single_connectivity_vdsl_gpon",
      "profile_name": "Single connectivity (VDSL/GPON)",
      "sites": 1,
      "subtotal_one_time": 150.0,
      "subtotal_monthly": 114.86
    },
    {
      "profile_id": "gpon_500_100_plus_mobile",
      "profile_name": "GPON Fibre 100M upload / 500M download + backup mobile",
      "sites": 1,
      "subtotal_one_time": 300.0,
      "subtotal_monthly": 416.09
    },
    {
      "profile_id": "dual_connectivity_main_plus_mobile",
      "profile_name": "Dual connectivity (main + mobile)",
      "sites": 1,
      "subtotal_one_time": 300.0,
      "subtotal_monthly": 141.13
    },
    // New Luxembourg Profiles
    {
      "profile_id": "lu_ic_100",
      "profile_name": "Internet Comfort 100/50",
      "sites": 1,
      "subtotal_one_time": 246.0,
      "subtotal_monthly": 198.0
    },
    {
      "profile_id": "lu_ic_500",
      "profile_name": "Internet Comfort 500/250",
      "sites": 1,
      "subtotal_one_time": 371.0,
      "subtotal_monthly": 320.0
    }
  ],
  "profile_sla": [
    {
      "profile_id": "dual_copper",
      "sla_name": "Silver SDWAN Full PXS SLA",
      "coverage": "15x6",
      "repair_time_hours": 3,
      "monthly": 0.0
    },
    // ... (All existing SLAs remain)
    {
      "profile_id": "tempo_mobile",
      "sla_name": "Standard SDWAN Full PXS SLA",
      "coverage": "12x5+8.5",
      "repair_time_hours": 5,
      "monthly": 15.0
    },
    {
      "profile_id": "dc",
      "sla_name": "Standard SDWAN Full PXS SLA",
      "coverage": "12x5+8.5",
      "repair_time_hours": 5,
      "monthly": 15.0
    },
    {
      "profile_id": "gpon_500_100",
      "sla_name": "Standard SDWAN Full PXS SLA",
      "coverage": "12x5+8.5",
      "repair_time_hours": 5,
      "monthly": 15.0
    },
    {
      "profile_id": "external_connectivity",
      "sla_name": "Standard SDWAN OTT SLA",
      "coverage": "12x5+8.5",
      "repair_time_hours": 5,
      "monthly": 15.0
    },
    {
      "profile_id": "hq",
      "sla_name": "Standard SDWAN Full PXS SLA",
      "coverage": "12x5+8.5",
      "repair_time_hours": 5,
      "monthly": 15.0
    },
    {
      "profile_id": "single_connectivity_vdsl_gpon",
      "sla_name": "Standard SDWAN Full PXS SLA",
      "coverage": "12x5+8.5",
      "repair_time_hours": 5,
      "monthly": 15.0
    },
    {
      "profile_id": "gpon_500_100_plus_mobile",
      "sla_name": "Silver SDWAN Full PXS SLA",
      "coverage": "15x6",
      "repair_time_hours": 3,
      "monthly": 0.0
    },
    {
      "profile_id": "dual_connectivity_main_plus_mobile",
      "sla_name": "Silver SDWAN Full PXS SLA",
      "coverage": "15x6",
      "repair_time_hours": 3,
      "monthly": 0.0
    },
    // SLA for LU
    {
      "profile_id": "lu_ic_100",
      "sla_name": "Standard SDWAN Full PXS SLA",
      "coverage": "12x5+8.5",
      "repair_time_hours": 5,
      "monthly": 0.0
    },
    {
      "profile_id": "lu_ic_500",
      "sla_name": "Standard SDWAN Full PXS SLA",
      "coverage": "12x5+8.5",
      "repair_time_hours": 5,
      "monthly": 0.0
    }
  ],
  "profile_lines": [
    // ... Existing Lines ...
    {
      "line_id": "dual_copper_f_access",
      "profile_id": "dual_copper",
      "block": "First Connectivity",
      "item_type": "Access",
      "description": "SD-WAN Connectivity DSL 30/70",
      "one_time": 150.0,
      "monthly": 46.68
    },
    {
      "line_id": "dual_copper_f_cpe",
      "profile_id": "dual_copper",
      "block": "First Connectivity",
      "item_type": "CPE",
      "description": "FG-40F",
      "one_time": 0.0,
      "monthly": 30.68
    },
    {
      "line_id": "dual_copper_f_sec",
      "profile_id": "dual_copper",
      "block": "First Connectivity",
      "item_type": "Security License",
      "description": "Member of SDWAN License Advanced UTP FG-40F",
      "one_time": 0.0,
      "monthly": 17.77
    },
    {
      "line_id": "dual_copper_f_pipe",
      "profile_id": "dual_copper",
      "block": "First Connectivity",
      "item_type": "Internet Pipe",
      "description": "SDWAN Internet pipe",
      "one_time": 0.0,
      "monthly": 0.0
    },
    {
      "line_id": "dual_copper_s_access",
      "profile_id": "dual_copper",
      "block": "Second Connectivity",
      "item_type": "Access",
      "description": "SD-WAN Connectivity DSL 30/70",
      "one_time": 150.0,
      "monthly": 46.68
    },
    {
      "line_id": "dual_copper_s_cpe",
      "profile_id": "dual_copper",
      "block": "Second Connectivity",
      "item_type": "CPE",
      "description": "FG-40F",
      "one_time": 0.0,
      "monthly": 38.83
    },
    {
      "line_id": "dual_copper_s_sec",
      "profile_id": "dual_copper",
      "block": "Second Connectivity",
      "item_type": "Security License",
      "description": "Member of SDWAN License Advanced UTP FG-40F",
      "one_time": 0.0,
      "monthly": 17.77
    },
    {
      "line_id": "dual_copper_s_pipe",
      "profile_id": "dual_copper",
      "block": "Second Connectivity",
      "item_type": "Internet Pipe",
      "description": "SDWAN Internet pipe",
      "one_time": 0.0,
      "monthly": 0.0
    },
    {
      "line_id": "tempo_mobile_f_access",
      "profile_id": "tempo_mobile",
      "block": "First Connectivity",
      "item_type": "Access",
      "description": "SDWAN - Mobile Main - 300GB - 4G/5G",
      "one_time": 150.0,
      "monthly": 60.83
    },
    {
      "line_id": "tempo_mobile_f_cpe",
      "profile_id": "tempo_mobile",
      "block": "First Connectivity",
      "item_type": "CPE",
      "description": "FG-40F 4G",
      "one_time": 0.0,
      "monthly": 40.42
    },
    {
      "line_id": "tempo_mobile_f_sec",
      "profile_id": "tempo_mobile",
      "block": "First Connectivity",
      "item_type": "Security License",
      "description": "Member of SDWAN License Advanced UTP FG-40F 4G",
      "one_time": 0.0,
      "monthly": 34.29
    },
    {
      "line_id": "tempo_mobile_f_pipe",
      "profile_id": "tempo_mobile",
      "block": "First Connectivity",
      "item_type": "Internet Pipe",
      "description": "SDWAN Internet pipe",
      "one_time": 0.0,
      "monthly": 0.0
    },
    {
      "line_id": "tempo_mobile_sla",
      "profile_id": "tempo_mobile",
      "block": "SLA",
      "item_type": "SLA",
      "description": "Standard SDWAN Full PXS SLA 12x5+8.5",
      "one_time": 0.0,
      "monthly": 15.0
    },
    {
      "line_id": "dc_f_access",
      "profile_id": "dc",
      "block": "First Connectivity",
      "item_type": "Access",
      "description": "SD-WAN Connectivity P2P SYM 200M Non PXS DC",
      "one_time": 450.0,
      "monthly": 321.93
    },
    {
      "line_id": "dc_f_cpe",
      "profile_id": "dc",
      "block": "First Connectivity",
      "item_type": "CPE",
      "description": "FG-100F",
      "one_time": 0.0,
      "monthly": 77.52
    },
    {
      "line_id": "dc_f_sec",
      "profile_id": "dc",
      "block": "First Connectivity",
      "item_type": "Security License",
      "description": "Member of SDWAN License Advanced UTP FG-100F",
      "one_time": 0.0,
      "monthly": 96.94
    },
    {
      "line_id": "dc_f_pipe",
      "profile_id": "dc",
      "block": "First Connectivity",
      "item_type": "Internet Pipe",
      "description": "SDWAN Internet pipe",
      "one_time": 0.0,
      "monthly": 0.0
    },
    {
      "line_id": "dc_sla",
      "profile_id": "dc",
      "block": "SLA",
      "item_type": "SLA",
      "description": "Standard SDWAN Full PXS SLA 12x5+8.5",
      "one_time": 0.0,
      "monthly": 15.0
    },
    {
      "line_id": "gpon_f_access",
      "profile_id": "gpon_500_100",
      "block": "First Connectivity",
      "item_type": "Access",
      "description": "SD-WAN Connectivity GPON 100/500",
      "one_time": 150.0,
      "monthly": 197.89
    },
    {
      "line_id": "gpon_f_cpe",
      "profile_id": "gpon_500_100",
      "block": "First Connectivity",
      "item_type": "CPE",
      "description": "FG-100F",
      "one_time": 0.0,
      "monthly": 77.52
    },
    {
      "line_id": "gpon_f_sec",
      "profile_id": "gpon_500_100",
      "block": "First Connectivity",
      "item_type": "Security License",
      "description": "Member of SDWAN License Advanced UTP FG-100F",
      "one_time": 0.0,
      "monthly": 96.94
    },
    {
      "line_id": "gpon_f_pipe",
      "profile_id": "gpon_500_100",
      "block": "First Connectivity",
      "item_type": "Internet Pipe",
      "description": "SDWAN Internet pipe",
      "one_time": 0.0,
      "monthly": 0.0
    },
    {
      "line_id": "gpon_sla",
      "profile_id": "gpon_500_100",
      "block": "SLA",
      "item_type": "SLA",
      "description": "Standard SDWAN Full PXS SLA 12x5+8.5",
      "one_time": 0.0,
      "monthly": 15.0
    },
    {
      "line_id": "ext_f_access",
      "profile_id": "external_connectivity",
      "block": "First Connectivity",
      "item_type": "Access",
      "description": "Bring your own access",
      "one_time": 0.0,
      "monthly": 0.0
    },
    {
      "line_id": "ext_f_cpe",
      "profile_id": "external_connectivity",
      "block": "First Connectivity",
      "item_type": "CPE",
      "description": "FG-40F",
      "one_time": 0.0,
      "monthly": 30.68
    },
    {
      "line_id": "ext_f_sec",
      "profile_id": "external_connectivity",
      "block": "First Connectivity",
      "item_type": "Security License",
      "description": "Member of SDWAN License Advanced UTP FG-40F",
      "one_time": 0.0,
      "monthly": 17.77
    },
    {
      "line_id": "ext_f_pipe",
      "profile_id": "external_connectivity",
      "block": "First Connectivity",
      "item_type": "Internet Pipe",
      "description": "SDWAN Internet pipe",
      "one_time": 0.0,
      "monthly": 0.0
    },
    {
      "line_id": "ext_sla",
      "profile_id": "external_connectivity",
      "block": "SLA",
      "item_type": "SLA",
      "description": "Standard SDWAN OTT SLA 12x5+8.5",
      "one_time": 0.0,
      "monthly": 15.0
    },
    {
      "line_id": "hq_f_access",
      "profile_id": "hq",
      "block": "First Connectivity",
      "item_type": "Access",
      "description": "SD-WAN Connectivity P2P 50/350",
      "one_time": 450.0,
      "monthly": 326.8
    },
    {
      "line_id": "hq_f_cpe",
      "profile_id": "hq",
      "block": "First Connectivity",
      "item_type": "CPE",
      "description": "FG-100F",
      "one_time": 0.0,
      "monthly": 77.52
    },
    {
      "line_id": "hq_f_sec",
      "profile_id": "hq",
      "block": "First Connectivity",
      "item_type": "Security License",
      "description": "Member of SDWAN License Advanced UTP FG-100F",
      "one_time": 0.0,
      "monthly": 96.94
    },
    {
      "line_id": "hq_f_pipe",
      "profile_id": "hq",
      "block": "First Connectivity",
      "item_type": "Internet Pipe",
      "description": "SDWAN Internet pipe",
      "one_time": 0.0,
      "monthly": 0.0
    },
    {
      "line_id": "hq_sla",
      "profile_id": "hq",
      "block": "SLA",
      "item_type": "SLA",
      "description": "Standard SDWAN Full PXS SLA 12x5+8.5",
      "one_time": 0.0,
      "monthly": 15.0
    },
    {
      "line_id": "single_f_access",
      "profile_id": "single_connectivity_vdsl_gpon",
      "block": "First Connectivity",
      "item_type": "Access",
      "description": "SD-WAN Connectivity DSL 30/100",
      "one_time": 150.0,
      "monthly": 46.68
    },
    {
      "line_id": "single_f_cpe",
      "profile_id": "single_connectivity_vdsl_gpon",
      "block": "First Connectivity",
      "item_type": "CPE",
      "description": "FG-40F",
      "one_time": 0.0,
      "monthly": 30.68
    },
    {
      "line_id": "single_f_sec",
      "profile_id": "single_connectivity_vdsl_gpon",
      "block": "First Connectivity",
      "item_type": "Security License",
      "description": "Member of SDWAN License Advanced UTP FG-40F",
      "one_time": 0.0,
      "monthly": 22.5
    },
    {
      "line_id": "single_f_pipe",
      "profile_id": "single_connectivity_vdsl_gpon",
      "block": "First Connectivity",
      "item_type": "Internet Pipe",
      "description": "SDWAN Internet pipe",
      "one_time": 0.0,
      "monthly": 0.0
    },
    {
      "line_id": "single_sla",
      "profile_id": "single_connectivity_vdsl_gpon",
      "block": "SLA",
      "item_type": "SLA",
      "description": "Standard SDWAN Full PXS SLA 12x5+8.5",
      "one_time": 0.0,
      "monthly": 15.0
    },
    {
      "line_id": "gponm_main_access",
      "profile_id": "gpon_500_100_plus_mobile",
      "block": "First Connectivity",
      "item_type": "Access",
      "description": "SD-WAN Connectivity GPON 100/500",
      "one_time": 150.0,
      "monthly": 197.89
    },
    {
      "line_id": "gponm_main_cpe",
      "profile_id": "gpon_500_100_plus_mobile",
      "block": "First Connectivity",
      "item_type": "CPE",
      "description": "FG-100F",
      "one_time": 0.0,
      "monthly": 77.52
    },
    {
      "line_id": "gponm_main_sec",
      "profile_id": "gpon_500_100_plus_mobile",
      "block": "First Connectivity",
      "item_type": "Security License",
      "description": "Member of SDWAN License Advanced UTP FG-100F",
      "one_time": 0.0,
      "monthly": 96.94
    },
    {
      "line_id": "gponm_main_pipe",
      "profile_id": "gpon_500_100_plus_mobile",
      "block": "First Connectivity",
      "item_type": "Internet Pipe",
      "description": "SDWAN Internet pipe",
      "one_time": 0.0,
      "monthly": 0.0
    },
    {
      "line_id": "gponm_bkp_access",
      "profile_id": "gpon_500_100_plus_mobile",
      "block": "Backup Connectivity",
      "item_type": "Access",
      "description": "SD-WAN Mobile Backup",
      "one_time": 150.0,
      "monthly": 19.75
    },
    {
      "line_id": "gponm_bkp_cpe",
      "profile_id": "gpon_500_100_plus_mobile",
      "block": "Backup Connectivity",
      "item_type": "CPE",
      "description": "FEX-101F (4G)",
      "one_time": 0.0,
      "monthly": 23.99
    },
    {
      "line_id": "gponm_bkp_pipe",
      "profile_id": "gpon_500_100_plus_mobile",
      "block": "Backup Connectivity",
      "item_type": "Internet Pipe",
      "description": "SDWAN Internet pipe",
      "one_time": 0.0,
      "monthly": 0.0
    },
    {
      "line_id": "gponm_sla",
      "profile_id": "gpon_500_100_plus_mobile",
      "block": "SLA",
      "item_type": "SLA",
      "description": "Silver SDWAN Full PXS SLA 15x6",
      "one_time": 0.0,
      "monthly": 0.0
    },
    {
      "line_id": "dualm_main_access",
      "profile_id": "dual_connectivity_main_plus_mobile",
      "block": "First Connectivity",
      "item_type": "Access",
      "description": "SD-WAN Connectivity DSL 30/100",
      "one_time": 150.0,
      "monthly": 46.68
    },
    {
      "line_id": "dualm_main_cpe",
      "profile_id": "dual_connectivity_main_plus_mobile",
      "block": "First Connectivity",
      "item_type": "CPE",
      "description": "FG-40F 4G",
      "one_time": 0.0,
      "monthly": 40.42
    },
    {
      "line_id": "dualm_main_sec",
      "profile_id": "dual_connectivity_main_plus_mobile",
      "block": "First Connectivity",
      "item_type": "Security License",
      "description": "Member of SDWAN License Advanced UTP FG-40F 4G",
      "one_time": 0.0,
      "monthly": 34.29
    },
    {
      "line_id": "dualm_main_pipe",
      "profile_id": "dual_connectivity_main_plus_mobile",
      "block": "First Connectivity",
      "item_type": "Internet Pipe",
      "description": "SDWAN Internet pipe",
      "one_time": 0.0,
      "monthly": 0.0
    },
    {
      "line_id": "dualm_bkp_access",
      "profile_id": "dual_connectivity_main_plus_mobile",
      "block": "Backup Connectivity",
      "item_type": "Access",
      "description": "SD-WAN Mobile Backup",
      "one_time": 150.0,
      "monthly": 19.75
    },
    {
      "line_id": "dualm_bkp_pipe",
      "profile_id": "dual_connectivity_main_plus_mobile",
      "block": "Backup Connectivity",
      "item_type": "Internet Pipe",
      "description": "SDWAN Internet pipe",
      "one_time": 0.0,
      "monthly": 0.0
    },
    {
      "line_id": "dualm_sla",
      "profile_id": "dual_connectivity_main_plus_mobile",
      "block": "SLA",
      "item_type": "SLA",
      "description": "Silver SDWAN Full PXS SLA 15x6",
      "one_time": 0.0,
      "monthly": 0.0
    },
    {
      "line_id": "dualm_rounding_adjustment",
      "profile_id": "dual_connectivity_main_plus_mobile",
      "block": "Adjustment",
      "item_type": "Adjustment",
      "description": "Rounding / subtotal reconciliation adjustment (to match estimate subtotal exactly)",
      "one_time": 0.0,
      "monthly": -0.01
    },
    // Lines for LU
    {
      "line_id": "lu_ic_100_access",
      "profile_id": "lu_ic_100",
      "block": "First Connectivity",
      "item_type": "Access",
      "description": "Internet Comfort 100/50",
      "one_time": 246.0,
      "monthly": 198.0
    },
    {
      "line_id": "lu_ic_500_access",
      "profile_id": "lu_ic_500",
      "block": "First Connectivity",
      "item_type": "Access",
      "description": "Internet Comfort 500/250",
      "one_time": 371.0,
      "monthly": 320.0
    }
  ]
};