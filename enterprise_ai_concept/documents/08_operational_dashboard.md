# Section 8: Operational Dashboard & Business User Experience

The dashboard is the primary interface for our users, and it's designed to be more than just a place to view data. It is an **action center**. Its core philosophy is to:

-   **Surface insights proactively,** bringing the most important information to the user's attention.
-   **Enable self-service exploration,** allowing users to follow their curiosity and answer their own questions.
-   **Facilitate iterative refinement,** making it easy for users to improve the system with their domain knowledge.
-   **Drive operational decisions,** bridging the gap between analysis and action.
-   **Track outcomes and learning,** creating a feedback loop to measure the impact of decisions.

### Dashboard Layout

The dashboard is organized into several key components, each designed for a specific purpose:

**1. Executive Summary Panel (Top):**
This provides an at-a-glance view of the most critical KPIs for senior leaders and managers.
-   **KPIs:** Current total power consumption vs. baseline, today's projected energy cost, the dollar value of active optimization opportunities, and the number of outliers requiring attention.
-   **Trends:** Sparklines showing power consumption and cost trends over the last 24 hours and 7 days.
-   **Alerts:** A summary of critical, warning, and informational alerts.

**2. Interactive Map/Facility View:**
A visual representation of the facility allows for intuitive, spatial navigation.
-   Pumps are color-coded by status (e.g., Green for optimal, Orange for attention recommended, Red for action required).
-   Users can hover over a pump for quick stats or click to open a detailed drill-down view.
-   A heat map overlay can visualize energy intensity across the facility.

**3. Recommendation Feed (Left Panel):**
This is a prioritized, real-time feed of AI-generated recommendations.
-   Each recommendation card shows the affected pumps, expected savings, confidence level, and time sensitivity.
-   Users can one-click to view the detailed analysis, accept the recommendation (which may schedule an action), defer it, or dismiss it with a reason, providing valuable feedback to the AI.

**4. Chat Interface (Bottom Right):**
The RAG-enabled conversational AI allows users to interact with the system using natural language.
-   It is context-aware, understanding the user's current view on the dashboard.
-   It can proactively suggest relevant follow-up questions.
-   It is multi-modal, capable of generating charts and tables directly in the chat window.
-   *Example Query:* "Compare the efficiency of the top 5 most-used pumps in Building 3 over the last month."

**5. Time-Series Visualization (Center):**
The main interactive chart for deep-dive analysis.
-   Users can layer multiple metrics, such as actual consumption, the forecast, and outlier bands.
-   Interactive controls allow for zooming, panning, and annotating the chart with events.
-   Users can compare different scenarios side-by-side.

**6. Feature Table Query Builder (Collapsible Panel):**
The "power user" interface, providing access to the self-service query tools described in Section 5 for ad-hoc feature exploration and analysis.

**7. Pump Detail Drill-Down:**
A dedicated view for a single asset, showing:
-   **Current Status:** Real-time metrics, efficiency vs. design point, and data quality score.
-   **Historical Performance:** Power consumption trends, efficiency degradation curves, and maintenance history.
-   **Predictive Insights:** The 24-hour forecast, outlier probability, and recommended actions.
-   **Relationships:** A view of connected pumps and system-level dependencies.

**8. Scenario Modeling Workspace (Dedicated Tab):**
A canvas where users can build, compare, and save the "what-if" cost scenarios described in Section 7, enabling data-driven strategic planning.

### User Workflows

The dashboard is designed to support the distinct workflows of different user personas:

-   **The Daily Operations Manager:** Starts their shift by reviewing the executive summary and the recommendation feed, accepting any high-confidence, low-risk optimizations. They use the interactive map to investigate any pumps flagged in red and ask the AI chat, *"Are there any operational risks for today's production schedule?"*
-   **The Energy Manager:** Performs a weekly review by selecting the last 7 days and querying the feature table for daily energy totals by facility. They investigate any variances using the AI chat and then use the scenario modeling workspace to project the impact of a new optimization strategy for the upcoming week.
-   **The Maintenance Planner:** Filters the pump list by "maintenance recommended" status. They drill down into each pump's condition indicators and use the AI to prioritize work based on a combination of failure risk and potential downtime cost, scheduling the work in the most optimal, non-disruptive windows.
-   **The Data Analyst:** Forms a hypothesis about a new way to measure pump efficiency. They use the query builder to create the new feature definition, trigger a pipeline re-run on historical data, and use the validation tools to test its quality and predictive power before promoting it to the production feature table for everyone to use.

This user-centric and action-oriented design ensures that the platform's powerful analytical capabilities are not just accessible but are actively integrated into the daily decisions and long-term strategies of the enterprise.

---
**[Previous: AI-Powered Intelligence Layer - RAG & Recommendations](./07_ai_intelligence_layer.md) | [Next: Decentralized Data Governance & Collaboration](./09_data_governance.md)**