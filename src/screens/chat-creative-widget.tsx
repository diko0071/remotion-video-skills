import React from "react";
import { RyzeApp } from "../kit/ryze-ui/app-shell";
import { AssistantMessage, ChatPage, Markdown, UserMessage } from "../kit/ryze-ui/chat";
import { AdMock, CreativeCard, CreativeShimmer } from "../kit/ryze-ui/widgets";

export const ChatCreativeWidget: React.FC = () => (
  <RyzeApp>
    <ChatPage title="Spring sale ad creatives">
      <UserMessage>
        Generate 3 ad creatives for the spring sale — dark premium look, one lighter variant
      </UserMessage>

      <AssistantMessage>
        <Markdown>
          <p>
            <strong>3 concepts ready.</strong> Two dark premium, one light — all sized 4:5 for
            Meta feed. The third is still rendering:
          </p>
        </Markdown>

        <div>
          <div className="creative-heading">Spring sale — concept batch 1</div>
          <div className="creative-grid">
            <CreativeCard
              name="spring-sale-dark-01"
              caption="Dark premium, price-led headline with urgency sub."
              actions
              image={
                <AdMock
                  badge="Spring Sale"
                  headline="Up to 30% off every shed"
                  sub="Free delivery until Sunday"
                  cta="Shop the sale"
                />
              }
            />
            <CreativeCard
              name="spring-sale-light-02"
              caption="Light lifestyle variant, benefit-led headline."
              image={
                <AdMock
                  light
                  badge="New Season"
                  headline="Your garden, upgraded"
                  sub="Sheds built to last 20 years"
                  cta="Browse styles"
                />
              }
            />
            <CreativeCard
              name="spring-sale-dark-03"
              caption="Rendering — product close-up with logo lockup."
              image={<CreativeShimmer />}
            />
          </div>
        </div>
      </AssistantMessage>
    </ChatPage>
  </RyzeApp>
);
